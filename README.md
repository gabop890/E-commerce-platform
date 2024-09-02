
# Plataforma de comercio electrónico

Se desarrollo una Api RESTful para el comercio electrónico, esta tiene dos funcionalidades principales, una la gestión del catalogo de productos y la otra la gestión de pedidos, ademas se incluyo un crud para la gestion de productos y un crud para gestion de categorias.
## Technologies
* Java 17
* Spring Boot 3.3.3
* lombok
* mybatis 3.0.3
* Maven 3.5.4
* MySql
* Angular 18.0.4
* Angular material 18.2.2
## Installation front-end

Install front-end with npm

```bash
  npm install front-end
  cd front-end
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/gabop890/E-commerce-platform.git
```

Go to the project directory

```bash
  cd back-end
```

Install dependencies

```bash
  mvn clean install
```

Start the server

```bash
  java -jar .\target\E-commerce-Platform-0.0.1-SNAPSHOT.jar

```
Test with Swagger
```http
http://localhost:8080/swagger-ui/index.html#/
```
## Appendix

En el proyecto back-end en el archivo "application.properties" se encuentran las credenciales para conectarse a la base de datos, en mi caso utilice una base cloud en https://railway.app/

para conectase a otra base de datos mySQL solo hay que cambiar las credenciales y correr el archivo DDL que se encuentra en el repositorio.

## Diagrams

![image](https://github.com/user-attachments/assets/7dbde8bc-8835-418c-90dc-029d6a4a9ef2)
![image](https://github.com/user-attachments/assets/2aee4bc1-3012-4ddf-9954-4fb51577c4c9)


## Authors

- [@gabop890](https://github.com/gabop890)

