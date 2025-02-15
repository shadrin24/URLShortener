# Используем Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY . .

# Открываем порт NestJS
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start"]
