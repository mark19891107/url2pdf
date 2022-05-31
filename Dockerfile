FROM centos:centos7

# Define working directory.
WORKDIR /data

# Define default command.
EXPOSE 3000
RUN curl -fsSL https://rpm.nodesource.com/setup_16.x | bash -
RUN yum install nodejs -y 
RUN yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
RUN yum install ImageMagick ImageMagick-devel ImageMagick-perl -y
COPY *.json /data
COPY *.js /data
RUN npm install
CMD node app.js