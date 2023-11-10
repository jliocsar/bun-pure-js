FROM oven/bun:latest AS installer
WORKDIR /dist

COPY package.json ./
COPY bun.lockb ./
COPY server static ./

RUN bun i

FROM oven/bun:latest AS app
WORKDIR /app
COPY --from=installer /dist ./
EXPOSE 3000
CMD ["bun", "start"]
