## Instalación del proyecto

Para poder realizar la instalaciónn correctamente se necesita PHP 8.1, composer en su versión 2.* y Node.js en su versión estable más actual.

1. Descargar el proyecto (o clonelo usando GIT)
2. Copie el archivo `.env.example` en su archivo `.env` y configure las credenciales de postqreslq para la base de datos
3. Navegue al directorio raíz del proyecto usando la terminal
4. Ejecute el comonado `composer install`
5. Establezca la clave de cifrado ejecutando el comando `php artisan key:generate --ansi`
6. Ejecute las migraciones con el comando `php artisan migrate`
7. Ejecute los seeders para generar los registros necesarios en la base de datos con el comando `php artisan db:seed`
8. Inicie el servidor local de laravel con el comando `php artisan serve`
9. Abra una nueva terminal sin cerrar la anterior y navegue a la carpeta `react`
10. Ejecute el comando `npm install`
11. Ejecute el comando `npm run dev` para iniciar el servidor de vite para React
