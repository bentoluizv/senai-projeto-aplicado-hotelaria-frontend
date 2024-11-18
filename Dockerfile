FROM node:22.11.0

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

EXPOSE 4321

CMD ["pnpm", "dev","--host", "0.0.0.0", "--port", "4321", "--force"]
