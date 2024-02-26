# Careerpath.
### by tryfix. 

Careerpath merupakan Platform Website yang membantu menemukan dan membangun jalur karir yang Anda inginkan. Baik seorang fresh graduate, profesional yang ingin beralih karir, atau mahasiswa yang mencari tempat magang, CareerPath menyediakan semua informasi dan sumber daya yang Anda butuhkan untuk mencapai tujuan karir.

## Table of Contents
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environtment-variables)
- [Reference](#reference)
  - [List of Endpoints](#list-of-endpoints)

## Getting Started
### Installation
**Step 1:** Clone this repository.

```bash
git clone https://github.com/gaduhhartawan/BE_CDC.git
```

**Step 2:** Setup the `.env` and complete the required [environment variables](#environment-variables).

**Step 3:** Install dependencies.

```bash
npm install
```

**Step 5:** Run the project.

```bash
npm start
```

### Environtment Variables
Sesuaikan nilai/value dengan data yang dimiliki.

```bash
# MongoDB URL
DATABASE_URI = $your_mongodb_url

# JWT Token
TOKEN_KEY = $your_jwt_key
```

## Reference
### List of Endpoints

use /api as prefix

| Request                            | Response                  |    Auth    |
| :--------------------------------- | :------------------------ | :--------: |
| `GET /jobs`                        | Get all Jobs Data         |     -      |
| `GET /jobs/:id`                    | Get Specific Job Data     |     -      |
| `POST /jobs`                       | Store Job Data            |     √      |
| `PAtCH /jobs/:id`                  | Update Job Data           |     √      |
| `DELETE /jobs/:id`                 | Delete Job Data           |     √      |
|                                    |                           |            |
| `GET /users`                       | Get all Users Data        |     √      |
| `GET /users/:id`                   | Get Specific User Data    |     √      |
| `PATCH /users/:id`                 | Update User Data          |     √      |
| `DELETE /users/:id`                | Delete User Data          |     √      |
|                                    |                           |            |
| `POST /auth/login`                 | create login data         |     -      |
| `POST /auth/signup`                | Store new User Data       |     -      |
| `POST /auth/logout`                | Clear login data          |     -      |
