FROM node:21.2.0

WORKDIR /usr/app

COPY package.json ./

RUN dir

RUN npm install

COPY . .

EXPOSE 3001

RUN npx prisma migrate dev

CMD npm run test:command