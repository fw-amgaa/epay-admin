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

# Set environment variables for the build
ENV NODE_ENV=production
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_TRUST_HOST=true
ENV API_URL=https://dev-cms.epayment.mn/api
ENV NEXT_PUBLIC_APP_URL=https://dev-admin1.epayment.mn/

# Build Nextjs
RUN pnpm run build

# Expose the Strapi port
EXPOSE 3000

# Start Nextjs
CMD ["pnpm", "start"]
