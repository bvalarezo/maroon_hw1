#!/bin/bash
pkgs='maven tree mongodb'
if !  dpkg -s $pkgs >/dev/null 2>&1; then
  sudo apt update
  sudo apt-get install $pkgs
fi
(cd /tmp && git clone --depth 1 --config core.autocrlf=false https://github.com/twolfson/sexy-bash-prompt && cd sexy-bash-prompt && make install) && source ~/.bashrc
mvn clean spring-boot:run
