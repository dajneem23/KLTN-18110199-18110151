FROM node:18-alpine

# Create app directory
RUN mkdir -p /app/server
WORKDIR /app/server

# Add package.json file
COPY package.json yarn.lock /app/server/

# Install packages without generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY . .

# Expose port
EXPOSE 8888

# Start service
CMD [ "yarn", "dev" ]
