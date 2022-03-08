FROM node:16
WORKDIR /dogdates/front
ENV PATH /dogdates/front/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]