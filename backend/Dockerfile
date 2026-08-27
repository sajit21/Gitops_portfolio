# Stage 1 — Install ALL dependencies & generate Prisma
FROM node:22-alpine AS builder
# Alpine needs libc6-compat to properly run Prisma binary engines
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package and schema files first for layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies like the Prisma CLI)
RUN npm ci

# Generate the Prisma Client (baked straight into node_modules)
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Prune devDependencies out of node_modules, leaving ONLY production packages
RUN npm prune --omit=dev


# Stage 2 — Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment flag
ENV NODE_ENV=production

# Use the built-in non-root "node" user available in official node alpine images
# Ensure the working directory is owned by the node user
RUN chown -R node:node /app

# Copy production node_modules (which already includes the generated prisma client)
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
# Copy application files from the builder
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/config ./config
COPY --from=builder --chown=node:node /app/controllers ./controllers
COPY --from=builder --chown=node:node /app/middleware ./middleware
COPY --from=builder --chown=node:node /app/models ./models
COPY --from=builder --chown=node:node /app/nodemailer ./nodemailer
COPY --from=builder --chown=node:node /app/routes ./routes
COPY --from=builder --chown=node:node /app/server.js ./server.js

# Switch context to the secure non-root user
USER node

EXPOSE 8000

# Execute node directly to forward OS termination signals correctly
CMD ["node", "server.js"]
