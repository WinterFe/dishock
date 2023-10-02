FROM node:18 as base
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npx prisma db pull && npx prisma generate
RUN npm run build