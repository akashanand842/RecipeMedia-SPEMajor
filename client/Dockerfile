# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /frontend
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build the production-ready code
RUN npm run build

# Expose the port that the application will run on
EXPOSE 2004

# Start the frontend server
CMD ["npm", "start"]
