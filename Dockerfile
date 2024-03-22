FROM node
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8888
ENV PORT=3000
CMD ["npm", "start"]