FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package.json ./
RUN npm install

COPY --chown=node:node src ./src
COPY --chown=node:node tests ./tests

USER node

CMD ["npm", "test"]
