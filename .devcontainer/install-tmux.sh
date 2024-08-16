#!/bin/bash

apt -y update
apt -y upgrade
apt -y install tmux git

git clone https://github.com/js-jslog/tmux-config.git /root/.config/tmux-config
ln -s /root/.config/tmux-config/.tmux.xterm.conf /etc/tmux.conf
