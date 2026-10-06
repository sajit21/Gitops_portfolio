# ============================================================
# Stage 1 — Build
# ============================================================
FROM node:22-alpine AS builder

# Alpine compatibility for Prisma
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency files first for layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy application source
COPY . .

# Remove devDependencies
RUN npm prune --omit=dev


# ============================================================
# Stage 2 — Production Runner
# ============================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create custom non-root user/group
RUN addgroup -S appgroup -g 1001 && \
    adduser -S appuser -u 1001 -G appgroup

# Copy production dependencies
COPY --from=builder --chown=1001:1001 /app/node_modules ./node_modules

# Copy application files
COPY --from=builder --chown=1001:1001 /app/package*.json ./
COPY --from=builder --chown=1001:1001 /app/prisma ./prisma
COPY --from=builder --chown=1001:1001 /app/config ./config
COPY --from=builder --chown=1001:1001 /app/controllers ./controllers
COPY --from=builder --chown=1001:1001 /app/middleware ./middleware
COPY --from=builder --chown=1001:1001 /app/models ./models
COPY --from=builder --chown=1001:1001 /app/nodemailer ./nodemailer
COPY --from=builder --chown=1001:1001 /app/routes ./routes
COPY --from=builder --chown=1001:1001 /app/server.js ./server.js

# Run application as custom non-root user
USER 1001:1001

EXPOSE 8000

CMD ["node", "server.js"]