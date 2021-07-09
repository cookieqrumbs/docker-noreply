const http = require("http");
const nodemailer = require("nodemailer");
const formidable = require("formidable");

require('dotenv').config()

const port = +(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'
const serverInfo = `Listening ${host}:${port}`

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: 'sendmail'
});

const server = http.createServer( (req, res) => {
  if (req.method.toLowerCase() == 'post') {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify(err))
      } else {
        if (fields && fields.from && fields.to && fields.subject && (fields.html || fields.text)) {
          let mailContent = {
            from: fields.from,
            to: fields.to,
            subject: fields.subject,
            html: fields.html,
            text: fields.text
          };
          if (files && files.attachments && files.attachments.length > 0) {
            console.log(JSON.stringify(files));
            mailContent.attachments = files.attachments.map( (value) => {
              return {
                filename: value.name,
                path: value.path
              }
            });
          }
          transporter.sendMail(mailContent, (err, info) => {
            if (err) {
              res.writeHead(500, { 'content-type': 'application/json' });
              res.end(JSON.stringify(err))
            } else {
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify({ messageId: info.messageId }))
            }
          });
        }
      }
    });
  } else {
    res.writeHead(200);
    res.end(serverInfo);
  }
})

server.listen(port, host)
console.log(serverInfo)
