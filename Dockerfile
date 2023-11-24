FROM oven/bun:latest AS jliocsar
COPY package.json jsconfig.json ./
COPY bun.lockb ./
COPY server ./server
COPY static ./static
RUN bun i
EXPOSE 3000
CMD ["bun", "start"]
