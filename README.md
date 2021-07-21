# Table of contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Webserver Configuration](#webserver-configuration)
6. [ShareX Configuration](#sharex-configuration)
7. [Flameshot Configuration](#flameshot-configuration)
8. [Upgrading](#upgrading)
9. [Demo](#demo)
10. [Support](#support)
11. [Donate](#donate)
***

## Introduction
This is a simple to use, configurable & customizable uploader with Discord Embed, ShareX, Flameshot support, and many more [features](#features).

## Features
* Customizable
* ShareX Support
* Flameshot Support
* Discord Embed Support
* Support for images (png, jpg, jpeg, gif)
* Support for .TXT files
* Support for .MP4 files
* View Raw
* Download
* Deletion URL

## Prerequisites
* Basic knowledge of Linux
* Node.JS v14 recommended or v14+
* (Optional) a web server (nginx recommended)

## Installation
**NOTE:** The installation guide was written assuming the host OS is Debian 10.

1. Clone the repository  
`$ git clone https://github.com/Rmlyy/Uploader.git`
2. CD into the uploader directory  
`$ cd Uploader`
3. Install the necessary packages  
`$ npm i`
4. Rename the `env.example` file to `.env`, then open it up in a text editor.  
5. Change the URL to your domain or IP Address. **(( Don't put the last / ))**  
6. Change the secret key so others can't upload to your server.   
7. Run it  
`$ node app.js`  
You can use something like `screen` or `pm2` to keep the server running.

## Webserver configuration
* NGINX with SSL example configuration:
```
server {
    server_name yourdomain.com www.yourdomain.com;
    listen 80;
    listen [::]:80;
    return 301 https://$host$request_uri;
}

server {
    server_name yourdomain.com www.yourdomain.com;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /path/to/your/ssl/certificate;
    ssl_certificate_key /path/to/your/ssl/certificate/key;

    # Maximum upload size in MB.
    client_max_body_size 512M;

    location / {
        # Change this to your server port.
        proxy_pass http://localhost:8720;
    }
}
```
* NGINX without SSL example configuration:
```

server {
    server_name yourdomain.com www.yourdomain.com;
    listen 80;
    listen [::]:80;

    # Maximum upload size in MB.
    client_max_body_size 512M;

    location / {
        # Change this to your server port.
        proxy_pass http://localhost:8720;
    }
}
```

* Apache with SSL example configuration:  
Make sure you have the `ssl` module enabled: `a2enmod ssl`   
Make sure you have the `proxy_http` module enabled: `a2enmod proxy_http`  
```
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    Redirect / https://yourdomain.com
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    SSLEngine On
    SSLCertificateFile /path/to/your/ssl/certificate
    SSLCertificateKeyFile /path/to/your/ssl/certificate/key

    # Maximum upload size in bytes.
    LimitRequestBody    536870912

    # Change this to your server port in .env
    ProxyPass / http://localhost:8720/
    ProxyPassReverse / http://localhost:8720/
</VirtualHost>
```
* Apache without SSL example configuration:  
Make sure you have the `proxy_http` module enabled: `a2enmod proxy_http`  
```
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    # Maximum upload size in bytes.
    LimitRequestBody    536870912

    # Change this to your server port in .env
    ProxyPass / http://localhost:8720/
    ProxyPassReverse / http://localhost:8720/
</VirtualHost>
```
## ShareX Configuration  
1. [Download the ShareX example config](https://dl.rmly.dev/config.sxcu)  
2. Import the config  
3. Change "Request URL" to your domain  
4. Change secret key value to your secret key  

## Flameshot Configuration
For Flameshot users on Linux, you can use [this shell script](https://gist.github.com/Rmlyy/3d712dd1d5ed75416746f7657b3819fb).

### Upgrading
To upgrade, simply replace all the old files and directories (except the uploads directory if you want to keep your uploads) with the new files, and then restart the server.

### Demo
A live version of this uploader is hosted at [https://i.rmly.dev](https://i.rmly.dev), however, there isn't any possibility to test the upload at the moment, it is best if you try it on your own.

## Support
Need help? Feel free to join [my discord server](https://discord.rmly.dev) or [email me](mailto:hello@rmly.dev).

## Donate
You can donate [here](https://rmly.dev/donate) to support this project. Thanks!
