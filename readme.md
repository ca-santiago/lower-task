<div align="center">
    <h1>Lower Task</h1>
    <i>The app you don't know that need till you use it. </i>
    <br/>
    <br/>
    <a href="https://github.com/grem-dev/lower-task/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/grem-dev/lower-task?style=for-the-badge"></a>&nbsp;&nbsp;
    <a href="https://github.com/grem-dev/lower-task/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/grem-dev/lower-task?style=for-the-badge"></a>&nbsp;&nbsp;
    <a href="https://github.com/grem-dev/lower-task"><img alt="GitHub stars" src="https://img.shields.io/github/repo-size/grem-dev/lower-task?style=for-the-badge"></a>&nbsp;&nbsp;
    <a href="https://github.com/grem-dev/lower-task/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/grem-dev/lower-task?style=for-the-badge"></a>
    <br/>
</div>

<br>

| Author: [Carmen Santiago](https://grem-dev.github.io/grem.github.io/) |
| --- |




## Clien App
[![made-with-node](https://img.shields.io/badge/NodeJs-v12.17.0-492.svg)](https://nodejs.org/en/) [![made-with-react](https://img.shields.io/badge/React-v17.0.1-41aafb.svg)](https://reactjs.org/) 

[OpenReadme](./client/README.md)

## Backend app
[![made-with-node](https://img.shields.io/badge/NodeJs-v12.17.0-492.svg)](https://nodejs.org/en/) [![made-with-typescript](https://img.shields.io/badge/TypeScript-v4.0.5-49f.svg)](https://www.typescriptlang.org/) [![made-with-mongodb](https://img.shields.io/badge/Made%20with-MongoDb-492.svg)](https://www.mongodb.com/en) [![made-with-python](https://img.shields.io/badge/Made%20with-Python-FFD343.svg)](https://www.python.org/)

[OpenReadme](./backend/readme.md)



---
| :warning: Inside client and backend there are the corresponding docker-compose.yml files to have up and running each app individualy :smile: |
| ---|

## Build
Lowertask was built over diferent tecnologies in all the development spectrum. 

### Build developtment

**Before start:** Docker compose will attach a folder called `db` in the current directory. This does not exist, so you need to create it or you can change the attached directory in `mong-db: volumes`.

Run docker compose dev file.

```Bash
    docker-compose -f docker-compose.dev.yml up -d
```

Make sure to set the correct env variables on the `docker-compose.dev.yml` file. see `backend/.env.example`.
The file storage vars can be your AWS credentials. By default those vars are set wiht the local minio cluster.

FILE_STORA_ENDPOINT should be your machine API address, the default one in docker-compode.dev.yml file is mine. Make sure to put http. Localhost wont work because of the docker virtual network and signedurl generation.


**Client App**
Disable for now. Run it by runing: 
_Install dependencies before_
```
$ cd client & npm start
```

**Minio cluster**
Before start: create the folder /date inside minio-cluster folder. This is the place where all your files will be stored.
Go to minio-cluster folder and run:
```
$ docker-compose up -d
```
You can access to the minio admin page by hitting localhost:9000 with the default cedentials. minioadmin minioadmin

### Build production

```sh
    docker-compose -f docker-compose.yml up -d 
```


## ToDo
- [ ] Production docker compose file
- [ ] License 
- [ ] API documentation*

## Hitos
