FROM node:18.10.0-alpine

WORKDIR /app

RUN npm install -g @angular/cli@16.2.16

EXPOSE 4200

CMD npm install && ng serve --host 0.0.0.0 --poll 2000 --proxy-config proxy.conf.json
