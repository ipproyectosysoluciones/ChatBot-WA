# T7 Verification Script — docker-infrastructure

# RED → GREEN → TRIANGULATE

# RED (expect failure if syntax wrong — not applicable; config passes)

# GREEN: validate all profiles

docker-compose config # base

docker-compose config --services

docker-compose -f docker-compose.yml -f docker-compose.dev.yml config

docker-compose -f docker-compose.yml -f docker-compose.prod.yml config

# TRIANGULATE: build targets + full profile check

docker build -t builderbot:bot --target bot .

docker build -t builderbot:prod --target production .

# All exit codes must be 0; no missing-env errors (with .env present)
