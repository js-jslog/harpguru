#!/bin/bash

sudo apt -y update
sudo apt -y upgrade
sudo apt -y install tmux git

git clone https://github.com/js-jslog/tmux-config.git ~/.config/tmux-config
sudo ln -s /home/node/.config/tmux-config/.tmux.xterm.conf /etc/tmux.conf
