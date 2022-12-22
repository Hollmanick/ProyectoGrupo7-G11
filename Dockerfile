FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm install
ENV NODE_ENV .
COPY . .
RUN npm run database
EXPOSE 3500

CMD ["npm", "start"]
