FROM node:18 AS development

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

WORKDIR /usr/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@16.0.0

COPY . .

RUN npm run build

EXPOSE 8080
