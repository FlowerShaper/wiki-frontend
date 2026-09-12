FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS deps
COPY . .

# install lib deps
WORKDIR /app/wiki-lib
RUN bun install

# install web deps
WORKDIR /app
RUN bun install

FROM base AS build
COPY --from=deps /app /app
RUN bun run build

FROM base AS prod
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=build /app/.output /app

EXPOSE 3000
CMD ["bun", "run", "./server/index.mjs"]