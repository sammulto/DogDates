FROM node:16
WORKDIR /dogdates/back
ENV PATH /dogdates/back/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]