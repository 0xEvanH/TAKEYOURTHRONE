FROM oven/bun:1 AS frontend
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:1 AS server
WORKDIR /app
COPY server/package.json ./
RUN bun install
COPY server/ ./
COPY --from=frontend /app/dist ./dist

ENV PORT=3001
EXPOSE 3001

CMD ["bun", "index.ts"]