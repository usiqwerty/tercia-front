FROM node:alpine AS builder
WORKDIR /tercia-front


COPY package.json .
RUN npm install
COPY . .
#EXPOSE 3000
RUN npm run build -- --prod

FROM nginx:alpine AS server_stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /tercia-front/build /usr/share/nginx/html
COPY --from=builder /tercia-front/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]