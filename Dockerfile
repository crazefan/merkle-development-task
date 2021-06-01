FROM node:14.16.0

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY client/package.json /app/client/package.json
COPY client/package-lock.json /app/client/package-lock.json

WORKDIR /app/client
RUN npm install
COPY . /app
RUN npm run build

WORKDIR /app
EXPOSE 5000
CMD ["npm", "start"]