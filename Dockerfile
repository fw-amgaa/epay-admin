# Use official Node.js image
FROM node:20-alpine

# Install PNPM globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build Strapi
RUN pnpm run build

# Expose the Strapi port
EXPOSE 3000

# Start Strapi
CMD ["pnpm", "start"]
