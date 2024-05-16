FROM node:19-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate
RUN npm run migrate

# RUN npm run build

# COPY .env ./dist/

# WORKDIR /dist

EXPOSE 8000

CMD ["npm", "run", "dev"]
# CMD node src/index.js