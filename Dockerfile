FROM node:21.2.0

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

ENV DATABASE_URL=".:/usr/app/file:.test.db"

RUN npx prisma generate

RUN npx prisma migrate dev

EXPOSE 3001

CMD npm run test:command