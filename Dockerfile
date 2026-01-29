FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 5173

# Start frontend server
# For Vite:
CMD ["npm", "start", "preview", "--", "--host"]