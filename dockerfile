# make the base stage 
FROM node:18 as base

#make the development image
FROM base as development
WORKDIR /app
COPY package.json .
RUN  npm install 
COPY . . 
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]

# make the production image
FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . . 
EXPOSE 4000
CMD [ "npm", "start" ]