FROM node:10

COPY ["package.json","package-lock.json", "/usr/src"]

WORKDIR /usr/src

RUN npm ci

COPY [".","/usr/src"]

CMD ["npm","run","dev:watch"]