<p align="center">
  <a href="https://builderbot.app/">
    <picture>
      <img src="https://builderbot.app/assets/thumbnail-vector.png" height="80">
    </picture>
    <h2 align="center">BuilderBot</h2>
  </a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@builderbot/bot">
    <img alt="" src="https://img.shields.io/npm/v/@builderbot/bot?color=%2300c200&label=%40bot-whatsapp">
  </a>
  <a aria-label="Join the community on GitHub" href="https://link.codigoencasa.com/DISCORD">
    <img alt="" src="https://img.shields.io/discord/915193197645402142?logo=discord">
  </a>
</p>

## Getting Started

With this library, you can build automated conversation flows agnostic to the WhatsApp provider, set up automated responses for frequently asked questions, receive and respond to messages automatically, and track interactions with customers. Additionally, you can easily set up triggers to expand functionalities limitlessly.

```
npm create builderbot@latest
```

## Documentation

Visit [builderbot](https://builderbot.app/) to view the full documentation.

## Official Course

If you want to discover all the functions and features offered by the library you can take the course.
[View Course](https://app.codigoencasa.com/courses/builderbot?refCode=LEIFER)

## Contact Us

- [💻 Discord](https://link.codigoencasa.com/DISCORD)
- [👌 𝕏 (Twitter)](https://twitter.com/leifermendez)

## Docker Infrastructure (Multi-Service)

Run the full BuilderBot stack (bot + PostgreSQL + MongoDB + Redis) via Docker Compose.

### Prerequisites

- Docker 24+ and Docker Compose v2
- `.env` (created from `.env.example`)

### Quick start

```bash
# 1. Create local .env from the template (gitignored)
cp .env.example .env

# 2. Start the full stack (bot + 3 data services)
docker compose up -d

# 3. Verify health
docker compose ps
docker compose logs -f bot
```

Visit `http://localhost:3000/health` for bot liveness.

### Development profile (hot reload + debug)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Features:

- Source mount (`./packages` → `/app/packages`) for hot reload
- Node.js inspector on `localhost:9229` (VS Code / Chrome DevTools)
- Verbose logging (`LOG_LEVEL=debug`)
- Local DB data under `./data/{postgres,mongo,redis}`

### Production profile

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Features:

- `Dockerfile` `production` target (multi-stage, `node:21-alpine3.18`)
- Resource limits (`cpus`, `memory`) per service
- `restart: unless-stopped` for all services
- Non-root user (uid `1001`), read-only root filesystem where possible
- Log rotation (json-file, 50 MB × 5 files)

### Build individual stages

```bash
docker build -t builderbot:bot      --target bot        .
docker build -t builderbot:prod     --target production .
```

### File structure

```
.
├── docker-compose.yml              # Base: bot, postgres, mongodb, redis
├── docker-compose.dev.yml          # Development override
├── docker-compose.prod.yml         # Production override
├── Dockerfile                       # Multi-stage (builder → bot / production)
├── .dockerignore                    # Build context excludes
└── .env.example                     # Env template (copy to .env)
```

### Validation

```bash
docker compose config                              # base
docker compose config --services
docker compose -f docker-compose.yml -f docker-compose.dev.yml  config
docker compose -f docker-compose.yml -f docker-compose.prod.yml config
docker build --check -f Dockerfile .
```

See `openspec/changes/docker-infrastructure/verify.md` for the full RED→GREEN→TRIANGULATE sequence.
