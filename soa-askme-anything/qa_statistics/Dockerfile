FROM node:latest

WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/qa_statistics

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 4002

CMD ["npm", "run", "start"]