# Uploader v1.0

Simple to use Uploader with Discord Embed, ShareX & Flameshot support.
***

## Features:
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
* (Optional) a web server

## Installation:
**NOTE:** The installation guide was written assuming the host OS is Debian 10.

1. Clone the repository
`$ git clone https://github.com/Rmlyy/Uploader.git`
2. CD into the uploader directory
`$ cd Uploader`
3. Install the necessary packages
`$ npm i`
4. Configure the `.env` file to meet your needs  
4.1 Change URL  
`URL=https://yourdomain.com` Change the URL to your domain or IP Address. **Don't put the last /**  
4.2 Change the secret key  
`SECRET=verysecretkey` It is highly recommended to change the secret key so others can't upload to your server.  
5. Run it
`node app.js`  
You can use something like `screen` or `pm2` to keep the server running.
6. Configure your webserver
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
    ProxyPass "/"   "http://localhost:8720"
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
    ProxyPass "/"   "http://localhost:8720"
</VirtualHost>
```
7. Configure ShareX   
7.1 Download the example config file from the repository
7.2 Import the config  
7.3 Change "Request URL" to your domain  
7.4 Change secret key value to your secret key  

## Configure Flameshot
For Flameshot users on Linux, you can use [this shell script](https://gist.github.com/Rmlyy/3d712dd1d5ed75416746f7657b3819fb).

## Support
Need help? Feel free to join [my discord server](https://discord.rmly.dev) or [email me](mailto:rmly@rmly.dev).

## Donate
You can donate [here](https://rmly.dev/donate) to support this project. Thanks!
