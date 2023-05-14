# Use the base image with Node.js installed
FROM node:14-alpine

# Set the working directory to /backend
WORKDIR /backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Run tests during the build process


# Expose the port that the application will run on
EXPOSE 8082

# Start the backend server
CMD ["npm", "start"]