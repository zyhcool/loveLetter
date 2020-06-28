FROM node:lts-alpine3.9

# 在容器中创建一个目录
RUN mkdir -p /usr/src/loveLetter/

WORKDIR /usr/src/loveLetter/

COPY . /usr/src/loveLetter/

RUN npm install

EXPOSE 3001

CMD npm run start
