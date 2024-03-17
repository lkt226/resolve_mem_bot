FROM node:21.2.0

WORKDIR /usr/app

COPY package.json ./

RUN dir

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev