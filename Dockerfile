FROM node:14

COPY ./server/dist/ /app/

COPY ./server/package*.json /app/

WORKDIR /app/

RUN npm install


EXPOSE 3001
EXPOSE 6379:6379

CMD [ "node", "index.js" ]
