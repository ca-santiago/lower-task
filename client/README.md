
# Lower Task Client App

A ReactJs app built to be the frontend of the LowerTask Backend App.

This Client app use all the end points provided by the backend found in this repo.

[![made-with-python](https://img.shields.io/badge/NodeJs-v12.17.0-492.svg)](https://nodejs.org/en/) [![made-with-python](https://img.shields.io/badge/TypeScript-v4.0.5-49f.svg)](https://www.typescriptlang.org/) [![made-with-python](https://img.shields.io/badge/Made%20with-MongoDb-492.svg)](https://www.mongodb.com/en)

[@CarlosPascacio](https://github.com/CarlosPascacio)
[@gremdev](https://github.com/grem-dev)

[![GitHub forks](https://img.shields.io/github/forks/grem-dev/lower-task.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/network/) [![GitHub stars](https://img.shields.io/github/stars/grem-dev/lower-task.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/stargazers/)


# Run

The `docker run` instructions are just in case you are getting up each container individualy. If you are using the docker-compose file in the root repository just ignore those instructions and run the whole following the instructions on the main [readme.md](../readme.md).

## Dev
Create the docker image by runing.
``` sh
$ docker build -f Dockerfile.dev . --tag lowertask-dev/client
```
Then just execute the container attaching the source folder and binding one port.

```sh
$ docker run --rm -p 3001:3000 -v "${PWD}/src:/app/src" lowertask-dev/client
```

Or install the dependencies locally and run the app with npm
```sh
$ npm i
$ npm start
```

Make sure to have the `.env` file with the corresponding credentials. See `.env.example` as guide. Same fo the docker-compose file.

## Prod
Build up the docker image using the Dockerfile located in this path. Make sure you have and environment file `.env` following the `.env.example` file. React will take those env vars for building up the app.
``` sh
$ docker build -f Dockerfile . --tag lowertask/client
```

then just run the container using 
```sh
$ docker run --rm -p 3001:80 lowertask-dev/client
```

We bind the port 80 because the client image is using an nginx image as base.

# TODO

- [ ] Styling

**Tasks**
-
- [ ] Create task panel
- [ ] Delete task
- [ ] Update Task

**Sessions**
- [ ] Multi sessions
- [ ] Account information panel
