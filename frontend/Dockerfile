FROM node:18

WORKDIR /app

# Установка зависимостей
COPY package.json package-lock.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Запуск Frontend
CMD ["npx", "serve", "-s", "build", "-l", "3000"]