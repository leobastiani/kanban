FROM leobastiani/ubuntu-with-user:22.04

RUN sudo apt update

RUN sudo apt-get install -y php php-zip composer

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | NODE_VERSION=19.2.0 bash

RUN sudo apt-get install -y php-curl php-xml php-mysql

RUN sudo apt-get install -y php-xdebug && \
  echo "xdebug.mode=debug \n\
xdebug.client_host=127.0.0.1 \n\
xdebug.client_port=9003 \n\
xdebug.start_with_request=yes" | sudo tee -a /etc/php/8.1/cli/conf.d/20-xdebug.ini

RUN sudo apt-get install -y gawk make && \
  git clone --recursive https://github.com/akinomyoga/ble.sh.git && \
  make -C ble.sh install PREFIX=~/.local && \
  echo 'source ~/.local/share/blesh/ble.sh' >> ~/.bashrc
