# docker-noreply
[![Build Status](https://www.travis-ci.com/libresquare/docker-noreply.svg?token=PqmqhRTFtxkWgs8tNyLd&branch=main)](https://www.travis-ci.com/libresquare/docker-noreply)

A container which accepts HTTP POST requests and send outgoing emails via a **sendmail** daemon.

**This container must be used behind a private network and must not be accepting HTTP requests from public network!**

## POST request

| Format | Data parts | Description |
| ------ | ---------- | ----------- |
| multipart/form-data | JSON | <pre>{
    **from**: {Mail from},
    **to**: {Mail to},
    **subject**: {Mail subject},
    **html**: {Mail contents in HTML},
    **text**: {Mail contents in plain text}
}</pre>
| | Files | Mail attachments |

*Todo: Implement basic authentication protection*
