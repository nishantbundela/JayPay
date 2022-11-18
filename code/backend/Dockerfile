FROM node:latest

WORKDIR /backend

COPY package.json ./
COPY prisma ./prisma/

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]