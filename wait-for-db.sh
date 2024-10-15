#!/bin/sh
# Ожидание, пока Postgres не станет доступен
echo "Ожидаем базу данных на хосте $POSTGRES_HOST:$POSTGRES_PORT"

until nc -z -v -w30 $POSTGRES_HOST $POSTGRES_PORT; do
    echo "Ждем подключения к базе данных..."
    sleep 1
done

echo "База данных доступна!"
exec "$@"
