# Usar una imagen base oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto que se usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
