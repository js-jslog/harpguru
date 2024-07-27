FROM node:20

# Set the working directory
WORKDIR /app

# Manually state the username
# It will be missing otherwise
ENV USER=root

# Bundle app source
COPY . .

#RUN npx create-expo-app@latest my-app --yes
