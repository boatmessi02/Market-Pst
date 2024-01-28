# Use official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies

RUN npm install

RUN mkdir dist

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose port 4000
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "prod"]