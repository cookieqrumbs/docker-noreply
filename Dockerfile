FROM node:14-slim

RUN apt-get update && apt-get install -y sudo sendmail && \
  echo 'node ALL=(root) NOPASSWD: /etc/init.d/sendmail start' >> /etc/sudoers && \
  usermod -aG sudo node && \
  cp /etc/mail/sendmail.cf /etc/mail/sendmail.cf.backup && \
  sed -i 's/O DaemonPortOptions.*Port=smtp.*Addr=127.0.0.1/O DaemonPortOptions=Family=inet,  Name=MTA-v4, Port=smtp, Addr=0.0.0.0/g' /etc/mail/sendmail.cf && \
  sed -i 's/#Connect:10.*RELAY/Connect:10.0    RELAY/g' /etc/mail/access

USER node
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --chown=node package*.json ./
RUN npm install

COPY --chown=node . .

ENV HOST=0.0.0.0 PORT=3000
ENV NODE_ENV=production

EXPOSE ${PORT}
ENTRYPOINT /entrypoint.sh
