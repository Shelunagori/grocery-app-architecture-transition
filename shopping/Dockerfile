FROM node

WORKDIR /app/shopping

COPY package.json .

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]