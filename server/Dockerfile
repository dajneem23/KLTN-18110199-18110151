FROM node:18-alpine

# Create app directory
RUN mkdir -p /server
WORKDIR /server

# Add package.json file
COPY /server/package.json /server/yarn.lock ./

# Install packages without generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY . .

# Expose port
EXPOSE 8888

# Start service
CMD [ "yarn", "dev" ]
