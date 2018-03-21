# srv-web-api-user
Servicio nodejs para gestionar usuarios con una web api

## Requisitos
- Definir las credenciales de base de datos mysql en model/user.js
- Ejecutar el script en la db que se enduentra en resources/db.sql
- Tener instalado nodejs

## Ejecutar servicio

El servidor corre en el puerto 3000, la primera vez se debe ejecutar lo siguiente:

> sh init.sh

Para levantar el server ejecutamos lo siguiente:

> node src/app.js
