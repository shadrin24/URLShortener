# Используем официальное изображение Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (оптимизация кеша)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY . .

# Собираем TypeScript в JavaScript
RUN npm run build

# Открываем порт
EXPOSE 8080

# Запускаем приложение в продакшн-режиме
CMD ["npm", "run", "start:prod"]
