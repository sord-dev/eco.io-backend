# eco.io-backend

## Requirements

- .env file in root directory (with index.js, package.json)

![image](https://user-images.githubusercontent.com/75338985/227611111-8cf936bc-7692-4f4e-b269-4279670c225f.png)

Inside of the .env file put these two values:
```
PORT=3000
DB_URL=[Elephant SQL Instance URL](https://customer.elephantsql.com/instance/create)
SESSION_SECRET=dhjkasdfasdhsdfkjsdfahgasdffasdgsdgsdfasdf
```

*any long string will be sufficient in the SESSION_SECRET row*

- Inside of a terminal from the root directory, install the depenancies of the project.

```
$ npm install
```

- After this, run the command to start the server and go to [localhost:3000](http://localhost:3000)

```
$ npm run dev
```

Expected result:

![image](https://user-images.githubusercontent.com/75338985/227611868-20cdf626-55b9-49f6-8149-7f396d4147e3.png)


## Routes

**main routes**

| Route | Description |
|--------------|-------------|
| GET / | Show current todos |


**auth routes**

| Route | Description |
|--------------|-------------|
| POST /auth/login {user details in body} | login to existing account |
| POST /auth/register {user details in body} | create a user |
| GET /auth/logout {nothing in body} | logout |


login user shape: 
```
{
    "username": "test_usr",
    "password": "test123"
}
```

register user shape: 
```
{
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "admin",
    "isAdmin": true
}
```
