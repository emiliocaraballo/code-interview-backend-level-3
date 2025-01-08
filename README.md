# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.


# Installation

## Configuración del Entorno de Desarrollo con .devcontainer

Este documento explica cómo configurar un entorno de desarrollo en **Visual Studio Code** utilizando un archivo **.devcontainer**, para gestionar **Node.js 20.18.1**

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalado:

1. [Docker](https://www.docker.com/)  
2. [Visual Studio Code](https://code.visualstudio.com/)  
3. Extensión de **Remote - Containers** en Visual Studio Code. Instálala desde [Visual Studio Code Extensions Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

---

## **Configuración del .devcontainer**

### 1. Crear el directorio `.devcontainer`

En tu proyecto, crea una carpeta llamada `.devcontainer` y dentro de esta, agrega los siguientes archivos:

#### **1.1. Archivo `devcontainer.json`**
Crea un archivo `devcontainer.json` con el siguiente contenido:

```json
{
	"name": "Coding Interview Backend Level 3",
	"build": {
	  "dockerfile": "Dockerfile",
	  "context": ".."
	},
	"forwardPorts": [3000],
	"postCreateCommand": "npm install",
	"remoteUser": "node",
	"features": {
	  "ghcr.io/devcontainers/features/node:1": {
		"version": "20.18.1"
	  }
	}
  }
```

#### **1.2. Archivo `Dockerfile`**
Crea un archivo `Dockerfile` con el siguiente contenido:

```bash
FROM node:20.18.1-slim

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
```




### Configurar Base de datos y variable de entorno de proyecto.
```bash
# creación del archivo .env basado en el archivo .env.example y configurar segun el ambiente.
$ cp .env.example .env

# ------ paso opcional -------
# si no tiene una base de datos, puede crear una docker-compose.yml 
# archivo basado en el docker-compose.yml.example archivo en el proyecto

$ cp docker-compose.yml.example docker-compose.yml
$ docker compose up -d

# debe haber instalado previamente docker y docker-compose en
# tu ordenador, para que funcione correctamente, si todo está correcto
# debe tener lista la base de datos de su proyecto.

```

## Running the app en Dev Container

```bash
# 1. Abre Visual Studio Code en la raíz de tu proyecto
# 2. Presiona F1 o Ctrl+Shift+P y selecciona "Remote-Containers: Reopen in Container"
# 3. VS Code construirá y abrirá el contenedor definido en .devcontainer. Este proceso puede tomar unos minutos.
# verificar que la variable de entorno este de forma correcta ejemplo

# si esta en modo devcontainer
$ DATABASE_HOST=host.docker.internal
# para que pueda acceder a tu maquina local y se pueda conectar a la BD. en caso que este usandolo en docker.

# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Running the app Localmente

```bash
# Paso a paso de correr el proyecto localmente.

# 1. Instalar NVM 
# macOS o Linux
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# Windows
$ Ve a la página oficial de NVM para Windows: https://github.com/coreybutler/nvm-windows/releases
Descarga el instalador más reciente (nvm-setup.zip) y ejecútalo.

# 2. Instalar Node.js
$ nvm install 20.18.1
$ nvm use 20.18.1

# 3. Instalar dependencias

$ npm i

# 4. Ejecutar el proyecto

# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Endpoints

```bash
# the default paths of the project are:
$ http://localhost:3000/items              # GET
$ http://localhost:3000/items/{id}         # GET
$ http://localhost:3000/items              # POST
$ http://localhost:3000/items              # PUT
$ http://localhost:3000/items              # DELETE

Documentación en Swagger 
$ http://localhost:3000/api-docs/
```

## Test

```bash
# unit tests
$ npm run test

Resultados de los tests:

> jest e2e

 PASS  e2e/index.test.ts
  E2E Tests
    ✓ should get a response with status code 200 (73 ms)
    Basic Items functionality
      ✓ should be able to list all items (24 ms)
      ✓ should be able to create a new item and get it by id (15 ms)
      ✓ should be able to update an item (21 ms)
      ✓ should be able to delete an item (12 ms)
    Validations
      ✓ should validate required fields (7 ms)
      ✓ should not allow for negative pricing for new items (6 ms)
      ✓ should not allow for negative pricing for updated items (12 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        3.507 s
```
