# Используем Node.js образ для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем React-приложение
RUN npm run build

# Используем Nginx для раздачи статических файлов
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
