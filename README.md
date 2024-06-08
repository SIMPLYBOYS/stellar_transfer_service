## Transfer service part of Stellar anchor service

<img
    src="[https://drive.google.com/file/d/1bGsB3OX6GHCaGFT84Xsoj9fch1B8_rkh/view](https://media.licdn.com/dms/image/C4E2DAQE19Ysj6h-Oww/profile-treasury-image-shrink_800_800/0/1601719652855?e=1718452800&v=beta&t=_MzUVEcY57-_TDpYNmdZLbGdsi3nsiXy1RUYnHk3o5o)"
    alt="Transfer_Service Architecture Diagram"
    title="Transfer_Service Architecture Diagram" />

### Requirements

* Node.js v8+ or Docker and Docker Compose
* Postgres running on local instance or Docker

### Running on localMachine

* Install dependencies - `npm i`
* Import DB schema and dummy data - `./create_db.sh`
* Run project - `npm run dev`, you also need fill-in postgre connection info into app.config.json

### Running on Docker

* `docker-compose up`
