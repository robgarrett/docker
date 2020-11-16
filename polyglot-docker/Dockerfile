FROM node:10-alpine

EXPOSE 3000
WORKDIR /opt/polyglot-v2/

RUN apk add --no-cache --virtual .build-deps linux-headers build-base && \
    apk add --no-cache python3 python3-dev py3-pip git ca-certificates wget tzdata openssl bash bash-completion && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache && \
    cd /opt && \
    git clone --depth=1 --single-branch --branch master https://github.com/UniversalDevicesInc/polyglot-v2.git && \
    cd /opt/polyglot-v2 && \
    npm install && \
    apk del .build-deps

VOLUME /root/.polyglot/nodeservers
VOLUME /usr/lib/python3.6/site-packages

# Set up the bashrc.
RUN echo "cd /root/.polyglot" >> /root/.bashrc

# Set default shell
ENV SHELL "/bin/bash"

# Execute bash
ENTRYPOINT ["/bin/bash", "--login"]
