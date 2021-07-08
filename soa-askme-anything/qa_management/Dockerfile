FROM node:latest

WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/qa_management

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 4000

CMD ["npm", "run", "start"]