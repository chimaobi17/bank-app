FROM php:8.4-cli

# Install dependencies and OCI8
RUN apt-get update && apt-get install -y \
    libaio1t64 \
    curl \
    unzip \
    git \
    build-essential \
    && ln -sf /usr/lib/x86_64-linux-gnu/libaio.so.1t64 /usr/lib/x86_64-linux-gnu/libaio.so.1 \
    && rm -rf /var/lib/apt/lists/*

# Download and install Oracle Instant Client (basiclite + SDK for oci8 build)
RUN mkdir -p /opt/oracle && \
    cd /tmp && \
    curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-basiclite-linux.x64-21.4.0.0.0dbru.zip && \
    curl -o instantclient-sdk.zip https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-sdk-linux.x64-21.4.0.0.0dbru.zip && \
    unzip instantclient-basiclite.zip -d /opt/oracle && \
    unzip instantclient-sdk.zip -d /opt/oracle && \
    rm instantclient-basiclite.zip instantclient-sdk.zip && \
    echo /opt/oracle/instantclient_21_4 > /etc/ld.so.conf.d/oracle.conf && \
    ldconfig

# Install OCI8 extension via PECL (yajra/laravel-oci8 wraps OCI8 — no pdo_oci needed)
RUN apt-get update && apt-get install -y --no-install-recommends libaio-dev && rm -rf /var/lib/apt/lists/* && \
    echo 'instantclient,/opt/oracle/instantclient_21_4' | pecl install oci8 && \
    docker-php-ext-enable oci8

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize --no-scripts

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
