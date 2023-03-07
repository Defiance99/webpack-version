FROM node:18-alpine AS prod
RUN npm install @vue/cli -g
RUN npm install serve -g
WORKDIR /jira-ui
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "serve", "-s", "dist", "-l", "3001" ]

FROM node:18-alpine AS dev
RUN npm install @vue/cli -g
WORKDIR /jira-ui
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD [ "npm", "run", "dev"]
