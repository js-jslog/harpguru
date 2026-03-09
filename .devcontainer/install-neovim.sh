#!/bin/bash

sudo apt -y update
sudo apt -y upgrade
# - tcc: C compiler required for neovim LSP
# - ripgrep: Required for some neovim telescope functions
# - rpm: libicu package required for GCM (rpm is smallest apt available pacakage I could find which includes libicu)
sudo apt -y install curl git tcc ripgrep rpm

curl -Lo /tmp/nvim.appimage https://github.com/neovim/neovim/releases/download/v0.11.2/nvim-linux-x86_64.appimage
chmod u+x /tmp/nvim.appimage
/tmp/nvim.appimage --appimage-extract
rm /tmp/nvim.appimage
sudo mv squashfs-root /usr/bin/nvim-appimage-extract
sudo ln -s /usr/bin/nvim-appimage-extract/AppRun /usr/bin/nvim

git clone https://github.com/js-jslog/neovim-config.git ~/.config/nvim
