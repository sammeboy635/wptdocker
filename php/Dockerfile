FROM php:7.4.0-fpm-alpine

RUN apk update
RUN apk add bash
RUN apk add curl
RUN apk add php-common
RUN apk add php-zip ffmpeg php-xml php-sqlite3 screen php-gd
RUN curl -s https://getcomposer.org/installer | php

RUN curl https://raw.githubusercontent.com/WPO-Foundation/webpagetest/master/composer.json -o composer.json


RUN mv composer.phar /usr/local/bin/composer && \
	composer install
