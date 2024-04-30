FROM node

WORKDIR /app/customers

COPY package.json .

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]