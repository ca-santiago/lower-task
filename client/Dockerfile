FROM node:15.4.0-alpine as build

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build


# Production
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
