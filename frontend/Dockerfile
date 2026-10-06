# ============================================================
# Stage 1 — Dependencies
# ============================================================
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci


# ============================================================
# Stage 2 — Build
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ============================================================
# Stage 3 — Production Runner
# ============================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create custom non-root group and user
RUN addgroup -S appgroup -g 1001 && \
    adduser -S appuser -u 1001 -G appgroup

# Copy application files and assign ownership to UID/GID 1001
COPY --from=builder --chown=1001:1001 /app/package*.json ./
COPY --from=builder --chown=1001:1001 /app/.next ./.next
COPY --from=builder --chown=1001:1001 /app/public ./public
COPY --from=builder --chown=1001:1001 /app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /app/next.config.mjs ./next.config.mjs

# Run as custom non-root user
USER 1001:1001

EXPOSE 3000

CMD ["npm", "start"]