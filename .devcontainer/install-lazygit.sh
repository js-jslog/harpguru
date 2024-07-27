#!/bin/bash

apt -y update
apt -y upgrade
apt -y install git curl

LAZYGIT_VERSION=0.41.0
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/download/v${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
install lazygit /usr/local/bin
rm lazygit.tar.gz
rm -rf lazygit
