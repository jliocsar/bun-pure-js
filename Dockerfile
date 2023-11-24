FROM oven/bun:latest AS jliocsar
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY server static ./
RUN bun i
EXPOSE 3000
CMD ["bun", "start"]
