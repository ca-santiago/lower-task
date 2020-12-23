# Lower Task Backend

Lower task is an Open source Task api aimed to basic CRUD actions. It is ideal for work with Frontend apps without need to build a simple backend app for network api consuming purpose.

[![made-with-python](https://img.shields.io/badge/NodeJs-v12.17.0-492.svg)](https://nodejs.org/en/) [![made-with-python](https://img.shields.io/badge/TypeScript-v4.0.5-49f.svg)](https://www.typescriptlang.org/) [![made-with-python](https://img.shields.io/badge/Made%20with-MongoDb-492.svg)](https://www.mongodb.com/en)

[@CarlosPascacio](https://github.com/CarlosPascacio)
[@gremdev](https://github.com/grem-dev)

[![GitHub forks](https://img.shields.io/github/forks/grem-dev/lower-task.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/network/) [![GitHub stars](https://img.shields.io/github/stars/grem-dev/lower-task.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/grem-dev/lower-task/stargazers/)

[![forthebadge cc-nc-sa](http://ForTheBadge.com/images/badges/cc-nc-sa.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0)

### Run
Up the app running docker compose yml file 
``` sh
$ docker-compose -f docker-compose.yml up -d
```
To run the development version just use the dev file `docker-compose.dev.yml`

Or install the dependencies locally and run the app with npm
```sh
$ npm i
$ npm run dev
```
Make sure to have the `.env` file with the corresponding credentials. See `.env.example` as guide. 

### Authorization

All the API request require the use of an authorization token. You can get an authorization token via login into the app when have an account.

The authorization token should be placed on the headers of each request like this:

```http
{
    ...
    headers:{
        'Authorization': 'Bearer <Token string>'
    }
}
```

---
| :exclamation: The documentation is been moved to wiki section out of this file |
| --- |

#### Anotations

`*` Required argument
`host/api/v1` Base request

## Tasks

```http
POST /tasks

{
    "content"
    "title"
}
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `title`   | `string` | ? Task's title   |
| `content` | `string` | ? Task's content |

You need provide at least title or content

#### Status Codes

| Status Code | Description             |
| :---------- | :---------------------- |
| 201         | `Created`               |
| 400         | `Bad request`           |
| 500         | `Internal server error` |
| 401         | `Unauthorized`          |

#### Get a task by its id

```http
GET /tasks/{task_id}
```

**Output example**

```http
{
    "id": "TaskId",
    "title": "Example title.",
    "content":"Example content.",
    "createdAt":"Date created"
}
```

**Status Codes**

| Status Code | Description             |
| :---------- | :---------------------- |
| 201         | `Created`               |
| 404         | `Not found`             |
| 500         | `Internal server error` |
| 401         | `Unauthorized`          |

---

## ToDo
- [ ] Workspaces
- [ ] Messaging
- [ ] Colaborators
- [ ] Share tasks
- [ ] ...   