FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Add package.json file
COPY package.json yarn.lock ./

# Install packages without generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY . .

# Expose port
EXPOSE 5050

# Start service
CMD [ "yarn", "start" ]
