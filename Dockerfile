FROM node:8
ADD . /var/www/code
WORKDIR /var/www/code
RUN apt-get update
CMD yarn && sleep 666666
