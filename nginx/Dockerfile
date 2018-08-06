FROM nginx

COPY proxy_ssl.conf /etc/nginx/conf.d/proxy_ssl.conf

COPY cert.pem /etc/nginx/conf.d/cert.pem

COPY key.pem /etc/nginx/conf.d/key.pem

EXPOSE 443
