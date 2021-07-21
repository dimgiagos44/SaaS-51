FROM node:latest

WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/frontend

COPY package*.json ./

RUN npm install 

RUN npm install react-scripts@4.0.3 -g  

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]