# syntax=docker/dockerfile:1
FROM node:20

WORKDIR /app

# Setup pnpm as the package manager of this app.
# We leave npm in place though as it's very bound
# up in the node install.
RUN corepack enable && corepack prepare pnpm@10.21.0 --activate

RUN chown node:node /app
USER node
ENV USER=node

##################################################
########### TEMPORARY ROOT USER STARTS ###########
##################################################
# Temporarily becoming root to:
# 1. give node user passwordless sudo. This action
#    is not included in the base image because it
#    is not safe for production images.
# 2. copy project in with node user ownership
USER root
RUN apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

COPY --chown=node:node . .

# Switch to node user for all development operations
USER node
##################################################
############ TEMPORARY ROOT USER ENDS ############ 
##################################################

# Allow git repo symlinks to be manifest as such
RUN git config core.symlinks true
# Reset .devcontainer.json from Windows prep
# change, and allow broken .claude symlinks to be
# returned to functionality.
RUN git reset --hard

# Keep container running for devcontainer life.
# Required when using `overrideCommand: false` in
# the devcontainer.json which is essential for the
# DinD feature's entrypoint to start dockerd
CMD ["sleep", "infinity"]
