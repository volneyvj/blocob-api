# Bloco B Api

## Api for Projects comments Follow UP

BlocoB is an express rest api social media for your neighbors only

## Features

- Add classifieds (product, service or social project)
- Communicate with other users from your neighborhood
- Make your neighborhood better!

This Api was created as part of IRONHACK`s WebDev bootcamp final project. Class of Oct/20.
Created by [Volney Faustini]

## Tech

Fup Api uses:

- [node.js]
- [Express]
- [Mongoose]

## Installation

Clone this repo

In the source folder add an .env file with this variables:

MONGO_URI - for your atlas cluster or local mongodb
TOKEN_SECRET - for your jwt secret
EXPIRATION_AUTH_TOKEN - 


MONGODBURL - - for your atlas cluster or local mongodb
TOKEN_SECRET - for setting your expiration time for jwt
cloudName - for setting your image online repository
cloudKey = for setting your image online repository
cloudSecret = for setting your image online repository
nodemailerCode = for sending automatic email when user forgets its password.

Install the dependencies and devDependencies and start the server.

npm i
npm run dev
```

You can test with:
**`https://api-blocob.herokuapp.com/`**

The common endpoints are the following:

All end point except /auth need to be access with token on Authorization header

Routes Methods you can visualize at:
**`https://drive.google.com/file/d/12pObklCNIr5pBXww7nIzFZpl3s1S5Ztj/view?usp=sharing`**

## Meta

Volney Koudsi Faustini – [@Linkedin](https://www.linkedin.com/in/volney-koudsi-faustini/) – volney.faustini@gmail.com


API Client GitHub link:
[https://github.com/](https://github.com/volneyvj/blocob-front)

## Contributing

1. Fork it (<https://github.com/volneyvj/blocob-api/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[heroku]: https://blocob.herokuapp.com/