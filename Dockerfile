FROM nginx
COPY dist/institutionApp/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf
