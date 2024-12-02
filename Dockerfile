FROM node:alpine as builder
WORKDIR /tercia-front


COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build -- --prod --output-path=/dist

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /dist /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]