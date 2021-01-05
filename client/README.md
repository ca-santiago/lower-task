
# Lower Task Client App

A ReactJs app built to be the frontend of the LowerTask Backend App.

This Client app use all the end points provided by the backend found in this repo.

[![made-with-python](https://img.shields.io/badge/NodeJs-v12.17.0-492.svg)](https://nodejs.org/en/) [![made-with-python](https://img.shields.io/badge/TypeScript-v4.0.5-49f.svg)](https://www.typescriptlang.org/) [![made-with-python](https://img.shields.io/badge/Made%20with-MongoDb-492.svg)](https://www.mongodb.com/en)

[@CarlosPascacio](https://github.com/CarlosPascacio)
[@gremdev](https://github.com/grem-dev)

[![GitHub forks](https://img.shields.io/github/forks/grem-dev/lower-task.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/network/) [![GitHub stars](https://img.shields.io/github/stars/grem-dev/lower-task.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/stargazers/)


### Run
Run the app by executing docker compose yml file 
``` sh
$ docker-compose -f docker-compose.yml up -d
```
To run the development version just use the dev file `docker-compose.dev.yml`

Or install the dependencies locally and run the app with npm
```sh
$ npm i
$ npm run dev
```
Make sure to have the `.env` file with the corresponding credentials. See `.env.example` as guide. Same fo the docker-compose file.
