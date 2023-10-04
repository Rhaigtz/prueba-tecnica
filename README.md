## Deployment

Antes de ejecutar cualquier comando, necesitamos instalar Docker, adjunto link de los pasos de instalación.

https://www.docker.com/get-started/

Para ejecutar el frontend, el backend, y la base de datos en conjunto, debemos pararnos en la base del proyecto y ejecutar el siguiente comando

```bash
  docker compose run
```

Este comando levantara los 3 servicios, dejándolos corriendo

Esto levantará el frontend en la máquina local en el puerto 3000 (Debemos tener disponible este puerto) http://localhost:3000/login

El backend en la máquina local en el puerto 8000 (Debemos tener disponible este puerto) http://localhost:8000/api

La base de datos será levantada en el puerto 3306 (Debemos tener disponible este puerto)

Para acceder a la base de datos MYSQL, debemos acceder a la carpeta env/mysql.env

## Swagger

Para acceder al swagger debemos acceder al siguiente link
http://localhost:8000/api/swagger
