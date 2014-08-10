#!/bin/bash
apt-get -y install ruby1.9.1-dev
apt-get -y install nodejs
gem install jekyll

cd /opt/jekyll
jekyll serve -w --force_polling -b ""

