# Sửa Dockerfile frontend để debug
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Debug: Liệt kê nội dung thư mục dist
RUN ls -la /app/dist

FROM nginx:1.23.3
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
