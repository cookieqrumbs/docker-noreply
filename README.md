# docker-noreply
[![Build Status](https://www.travis-ci.com/libresquare/docker-noreply.svg?token=PqmqhRTFtxkWgs8tNyLd&branch=main)](https://www.travis-ci.com/libresquare/docker-noreply)

A container which accepts HTTP POST requests and send outgoing emails via a **sendmail** daemon.

**This container must be used behind a private network and must not be accepting HTTP requests from public network!**

## POST request

- **Type**: multipart/form-data

- **Form data part**:
    ```json
    {
        "from": /*Mail from*/,
        "to": /*Mail to*/,
        "subject": /*Mail subject*/,
        "html": /*Mail contents in HTML*/,
        "text": /*Mail contents in plain text*/
    }
    ```
- **File parts**: Mail attachments

## Todo
*Implement basic authentication protection*
