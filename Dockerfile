FROM node:24.11.1

WORKDIR /app

# Copiar apenas arquivos de dependências primeiro (melhor cache)
COPY package.json yarn.lock* ./

# Instalar dependências com yarn
RUN yarn install

# Copiar o restante do código
COPY . .

EXPOSE 3333

# Usar yarn dev para hot reload com nodemon e start em produção
CMD ["yarn", "dev"]
# CMD ["npm", "start"]