FROM NODE:12

WORKDIR "/etc/app"

COPY ["","","/etc/app"]

RUN npm i --prod 

CMD ["npm", "start"]
