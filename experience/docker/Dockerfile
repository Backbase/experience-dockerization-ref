FROM nginx:mainline-alpine

COPY ./statics /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY envsubst-on-html-templates.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/envsubst-on-html-templates.sh