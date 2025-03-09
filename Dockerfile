
# Use official Strapi image or Node.js to build
FROM node:20-alpine
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