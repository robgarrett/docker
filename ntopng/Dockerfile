FROM ubuntu:22.04 as build
MAINTAINER Rob Garrett <rob@robgarrett.com>

ENV WORKDIR /ntop
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR ${WORKDIR}

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get install -y \
  vim-tiny \
  curl \
  autoconf \
  autogen \
  automake \
  bison \
  build-essential \
  debhelper \
  dkms \
  dpkg-sig \
  flex \
  gcc \
  geoipupdate \
  golang-go \
  git \
  libxtables-dev \
  libcairo2-dev \
  libcap-dev \
  libcurl4-openssl-dev \
  libgeoip-dev \
  libhiredis-dev \
  libjson-c-dev \
  libmaxminddb0 \
  libmaxminddb-dev \
  libmysqlclient-dev \
  libncurses5-dev \
  libnetfilter-conntrack-dev \
  libnetfilter-queue-dev \
  libpango1.0-dev \
  libpcap-dev \
  libpng-dev \
  libreadline-dev \
  librrd-dev \
  libsqlite3-dev \
  libssl-dev \
  libtool \
  libtool-bin \
  libxml2-dev \
  libzmq5-dev \
  mmdb-bin \
  net-tools \
  pkg-config \
  subversion \
  redis-server \
  rrdtool \
  wget \
  zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

RUN git clone --branch 4.8-stable https://github.com/ntop/nDPI.git nDPI
RUN git clone --branch 5.6-stable https://github.com/ntop/ntopng.git ntopng
RUN cd nDPI && ./autogen.sh && ./configure && make
RUN cd ntopng && ./autogen.sh && ./configure && make && make install
RUN ["chmod", "+x", "ntopng/ntopng"]

FROM ubuntu:22.04
MAINTAINER Rob Garrett <rob@robgarrett.com>

ENV WORKDIR /ntop
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR ${WORKDIR}

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get install -y \
  libpcap-dev \
  librrd-dev \
  libjson-c-dev \
  libmaxminddb-dev \
  libhiredis-dev \
  libsqlite3-dev \
  libmysqlclient-dev \
  libzmq5-dev \
  libcurl4-openssl-dev 

RUN mkdir /usr/local/share/ntopng
COPY --from=build /usr/local/share/ntopng /usr/local/share/ntopng
COPY --from=build /usr/local/bin/ntopng /usr/local/bin/ntopng

RUN useradd ntopng
RUN ["chown", "-R", "ntopng:ntopng", "/ntop"]

VOLUME /var/lib/ntopng

EXPOSE 3000/tcp
EXPOSE 2055/udp

ENTRYPOINT ["ntopng"]
CMD [ 						\
	"--community",				\
	"--data-dir", "/var/lib/ntopng",	\
	"--http-port", "0.0.0.0:3000",		\
	"--interface", "tcp://0.0.00:5556c",	\
	"--redis", "redis"			\
]

