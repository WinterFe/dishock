FROM node:18 as base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# FROM base as prod
# RUN npm run build