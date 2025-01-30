FROM python:3.12-slim

# Копируем uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Копируем проект
COPY . /app

WORKDIR /app

# Устанавливаем зависимости через uv
RUN uv sync --frozen --no-cache

# Явно устанавливаем passlib и другие зависимости через pip (для безопасности)
RUN pip install --no-cache-dir passlib[argon2] uvicorn fastapi

# Запускаем сервер
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]