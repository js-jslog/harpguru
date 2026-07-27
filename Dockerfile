# syntax=docker/dockerfile:1
FROM node:26

WORKDIR /app

RUN npm install -g pnpm@10.34.5

RUN chown node:node /app
USER node
ENV USER=node

##################################################
########### TEMPORARY ROOT USER STARTS ###########
##################################################
# Temporarily becoming root to install all OS-level
# tooling, Docker Engine, and dev utilities. This
# is the only stage that uses root in the resulting
# image; the runtime stage drops back to node.
USER root

RUN apt -y update && apt -y upgrade

RUN apt install -y sudo

# Passwordless sudo for the node user. Dev-only
# concession; the base image deliberately omits
# this so production images are not weakened.
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

##################################################
############ TEMPORARY ROOT USER ENDS ############
##################################################
USER node

RUN sudo apt install -y curl git tcc ripgrep rpm tmux

# git config
RUN git config --global user.name "js-jslog"
RUN git config --global user.email "josephsinfield@rullion.co.uk"
RUN git config --global merge.tool "nvimdiff"
RUN git config --global core.editor "nvim"

# Lazygit
RUN curl -Lo /tmp/lazygit.tar.gz \
      "https://github.com/jesseduffield/lazygit/releases/download/v0.63.1/lazygit_0.63.1_linux_x86_64.tar.gz" && \
    tar -xf /tmp/lazygit.tar.gz -C /tmp lazygit && \
    sudo install -D /tmp/lazygit /usr/local/bin/lazygit && \
    rm /tmp/lazygit.tar.gz /tmp/lazygit

# GCM
RUN curl -Lo /tmp/gcm-linux_amd64.2.4.1.deb https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.4.1/gcm-linux_amd64.2.4.1.deb
RUN sudo dpkg -i /tmp/gcm-linux_amd64.2.4.1.deb
RUN rm /tmp/gcm-linux_amd64.2.4.1.deb
RUN /usr/local/bin/git-credential-manager configure
RUN git config --global credential.credentialStore plaintext

# claude
RUN echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && . ~/.bashrc
RUN curl -fsSL https://claude.ai/install.sh | bash

# neovim
RUN curl -Lo /tmp/nvim.appimage https://github.com/neovim/neovim/releases/download/v0.11.2/nvim-linux-x86_64.appimage
RUN chmod u+x /tmp/nvim.appimage
RUN /tmp/nvim.appimage --appimage-extract
RUN rm /tmp/nvim.appimage
RUN sudo mv squashfs-root /usr/bin/nvim-appimage-extract
RUN sudo ln -s /usr/bin/nvim-appimage-extract/AppRun /usr/bin/nvim
RUN git clone https://github.com/js-jslog/neovim-config.git ~/.config/nvim

# tmux
RUN git clone https://github.com/js-jslog/tmux-config.git ~/.config/tmux-config
RUN sudo ln -s /home/node/.config/tmux-config/.tmux.xterm.conf /etc/tmux.conf

# Project source last so the heavy tooling layers
# stay cached across source-only changes.
COPY --chown=node:node . .

# Allow git repo symlinks to be manifest as such
RUN git config core.symlinks true
# Reset .devcontainer.json from Windows prep
# change, and allow broken .claude symlinks to be
# returned to functionality.
RUN git reset --hard

CMD ["sleep", "infinity"]
