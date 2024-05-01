# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve static content
RUN npm install -g serve

# Serve the app on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
