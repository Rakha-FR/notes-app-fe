# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy files
COPY package.json ./
COPY . .

RUN npm install

# Install dependencies
RUN npm ci

# Build React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]