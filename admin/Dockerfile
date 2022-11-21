FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Add package.json file
COPY /admin/package.json /admin/yarn.lock ./

# Install packages without generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY ./admin/ .

#WORKDIR /server/src

# Expose port
EXPOSE 8080


# Start service
CMD [ "yarn", "dev" ]
