# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy precompiled files
COPY dist/ ./dist

# Expose the port
EXPOSE 3000

# Run the compiled JavaScript file
CMD ["node", "dist/server.js"]
