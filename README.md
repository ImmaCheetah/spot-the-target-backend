# Spot The Target API

This is the API of my full stack photo tagging app.

You can check out the client here out here: https://github.com/ImmaCheetah/spot-the-target-frontend

## Tools/Languages

[![JS](https://img.shields.io/badge/-JAVASCRIPT-000?style=for-the-badge&logo=javascript&logoColor=F0DB4F)](#) [![NPM](https://img.shields.io/badge/-npm-000?style=for-the-badge&logo=npm)](#) [![EXPRESS](https://img.shields.io/badge/-express-000?style=for-the-badge&logo=express)](#) 
[![POSTGRES](https://img.shields.io/badge/postgres-black?style=for-the-badge&logo=postgresql&)](#)
[![PRISMA](https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma&)](#)
[![SUPERTEST](https://img.shields.io/badge/supertest-black?style=for-the-badge&logo=supertets&)](#)
[![JEST](https://img.shields.io/badge/jest-black?style=for-the-badge&logo=jest&)](#)

## Endpoints

| Method | URL | Description |

|  --------  |  ----------------------------------------  |  ----------------------------------------  |

|  `GET`  |  `/api`  | Retrieve home page |

|  `GET`  |  `/api/map/:mapId`  | Retrieve game map data |

|  `POST`  |  `/api/map/:mapId/target/:targetId`  | Verify coordinates sent from user for target |

|  `POST`  |  `/api/map/:mapId`  | Record start time for user when starting game |

|  `GET`  |  `/api/leaderboard/map/:mapId`  | Retrieve leaderboard of selected map |

|  `GET`  |  `/api/leaderboard/:scoreId`  | Retrieve initial time from user's score to calculate total time |

|  `PATCH`  |  `/api/leaderboard/:scoreId`  | Update user's final game time |

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api`                                   | Retrieve home page                       |
| `GET`    | `/api/map/:mapId`                        | Retrieve game map data                       |
| `POST`   | `/api/map/:mapId/target/:targetId`       | Verify coordinates sent from user for target   |
| `POST`   | `/api/map/:mapId`                        | Record start time for user when starting game  |
| `GET`    | `/api/leaderboard/map/:mapId`            | Retrieve leaderboard of selected map  |
| `GET`    | `/api/leaderboard/:scoreId`              | Retrieve initial time from user's score to calculate total time  |
| `PATCH`  | `/api/leaderboard/:scoreId`              | Update user's final game time |

## Learning Outcomes
- Test routes with Supertest
- Setup a test db for testing purposes
- Set up and teardown database for tests
- Normalize data before verifying coordinates

