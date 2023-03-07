FROM node:16
RUN npm install @vue/cli -g
RUN npm install serve -g
WORKDIR /jira-clone
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist", "-l", "3000" ]

FROM node:16 AS dev
RUN npm install @vue/cli -g
WORKDIR /jira-clone
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "run", "dev"]
