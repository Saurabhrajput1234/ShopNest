# Use official Node.js image as the base image
FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code into the container
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Set environment variables (modify as needed)
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "server.js"]
