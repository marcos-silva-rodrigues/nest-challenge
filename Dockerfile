FROM node:20-slim 

RUN apt update && apt install -y openssl procps

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
RUN npx prisma generate

CMD [ "/home/node/app/.docker/start-dev.sh" ]
