# ### STAGE 1: Build ###
# FROM node:10-alpine as build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/enterprise-AI /usr/share/nginx/html
# EXPOSE 4200


#Build Stage Start

#Specify a base image
# FROM node:alpine as builder
FROM node:10-alpine as builder


#Specify a working directory
WORKDIR /usr/src/app

#Copy the dependencies file
COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmjs.org/

#Install dependencies
RUN npm install
RUN npm install -g @angular/cli@~10.0.0

#Copy remaining files
COPY . .

#Build the project for production
RUN npm run build 

# CMD npm start


# Run Stage Start
# FROM nginx:1.17-alpine
FROM nginx:1.17.1-alpine

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
# COPY --from=builder /app-ui/dist /usr/share/nginx/html

COPY config/aimssl.crt /etc/nginx/certs/aimssl.crt
COPY config/aimssl.key /etc/nginx/certs/aimssl.key
COPY --from=builder /usr/src/app/dist/enterprise-AI /usr/share/nginx/html

# Copy .env file and shell script to container
#WORKDIR /usr/share/nginx/html
# COPY ./env.sh .
# COPY .env .
# Add bash
# RUN apk add --no-cache bash

# Make our shell script executable
# RUN chmod +x env.sh
# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

CMD ["nginx", "-g", "daemon off;"]

