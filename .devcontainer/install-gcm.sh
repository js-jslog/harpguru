#!/bin/bash

apt -y update
apt -y upgrade
apt -y install git curl

curl -Lo /tmp/gcm-linux_amd64.2.4.1.deb https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.4.1/gcm-linux_amd64.2.4.1.deb
dpkg -i /tmp/gcm-linux_amd64.2.4.1.deb
rm /tmp/gcm-linux_amd64.2.4.1.deb
/usr/local/bin/git-credential-manager configure

git config --global credential.credentialStore plaintext
