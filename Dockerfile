# Use official Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set environment variables for the build
ENV NODE_ENV=production
ENV API_URL=https://dev-cms.epayment.mn/api

# Build the Next.js app
RUN pnpm run build

# Use a lightweight image for production
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
