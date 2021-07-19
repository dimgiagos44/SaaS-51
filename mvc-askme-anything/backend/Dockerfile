# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

FROM node:latest AS builder
WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/backend
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:latest
WORKDIR /home/dimgi/Desktop/SaaS-51/soa-askme-anything/backend
COPY --from=builder /home/dimgi/Desktop/SaaS-51/soa-askme-anything/backend ./
EXPOSE 3001
CMD ["npm", "run", "start"]

