FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install curl for healthcheck and dependencies
RUN apk add --no-cache curl && \
  npm install --legacy-peer-deps

# Copy source
COPY . .

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "run", "dev"]
