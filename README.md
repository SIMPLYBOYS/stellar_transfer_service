## Transfer service part of Stellar anchor service

<img
    src="https://drive.google.com/file/d/1bGsB3OX6GHCaGFT84Xsoj9fch1B8_rkh"
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
