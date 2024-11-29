# Use Node.js version 20 LTS as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application files to the working directory
COPY . .


# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 4173

# Command to run the app
CMD ["npm", "run", "preview", "--", "--host"]
