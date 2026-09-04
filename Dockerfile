# Unified Dockerfile for ChatBot-WA monorepo (multi-stage)
# Pattern mirrored from starters/apps/base-ts-voice-whatsapp-memory/Dockerfile
# Targets: bot (builder + bot artifacts), production (deploy stage)

# ------------------------------------------------------------------
# Builder stage — shared dependencies + build
# ------------------------------------------------------------------
FROM node:21 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Dependency manifests (cached layer)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml lerna.json ./

# Source for install (Debian base, no apk)
COPY . .
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ git \
    && pnpm install \
    && pnpm run build \
    && apt-get purge -y --auto-remove python3 make g++ git \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------------
# Bot stage — bot package artifacts only
# ------------------------------------------------------------------
FROM builder AS bot
WORKDIR /app
# Bot artifacts already built by builder; expose bot port
ENV NODE_ENV=development
EXPOSE 3000
# HEALTHCHECK uses bot HTTP endpoint (spec §Health Checks)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["pnpm", "run", "start"]

# ------------------------------------------------------------------
# Production deploy stage — minimal runtime, non-root, read-only where possible
# ------------------------------------------------------------------
FROM node:21 AS production
WORKDIR /app

ARG PORT=3000
ENV PORT=${PORT} NODE_ENV=production
EXPOSE ${PORT}

# Non-root user (Debian / node base image)
RUN groupadd -r nodejs && useradd -r -g nodejs -s /bin/false nodejs

# Only compiled artifacts + production dependencies (no source / devDeps)
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/assets /app/assets/
COPY --from=builder /app/*.json /app/*.yaml /app/*.yml /app/*.md ./
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@11.24.0 --activate \
    && npm cache clean --force \
    && pnpm install --production --ignore-scripts \
    && chown -R nodejs:nodejs /app \
    && rm -rf /usr/local/share/.cache/pnpm /app/node_modules/.pnpm /app/*.tgz \
    && chmod 555 /app

USER nodejs

# Production HEALTHCHECK (same endpoint, stricter)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:${PORT}/health || exit 1

CMD ["pnpm", "run", "start"]
