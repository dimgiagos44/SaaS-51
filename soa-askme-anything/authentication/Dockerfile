FROM node:latest

WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/authentication

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 4001

CMD ["npm", "run", "start"]