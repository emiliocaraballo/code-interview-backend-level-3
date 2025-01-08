FROM node:20.18.1-slim

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install

COPY . .

RUN npm run build

#pruebas unitarias
CMD ["npm", "run", "start"]
