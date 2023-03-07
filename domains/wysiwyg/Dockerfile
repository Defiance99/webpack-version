FROM node:18-alpine
RUN npm install @vue/cli -g
RUN npm install serve -g
WORKDIR /wysiwyg
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
CMD [ "serve", "-s", "dist", "-l", "3002" ]

FROM node:18-alpine AS dev
RUN npm install @vue/cli -g
WORKDIR /wysiwyg
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3002
EXPOSE 3002
CMD [ "npm", "run", "dev"]
