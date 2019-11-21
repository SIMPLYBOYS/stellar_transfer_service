## Transfer service part of Stellar anchor service

<img
    src="https://media-exp1.licdn.com/media-proxy/ext?w=1024&h=456&f=n&hash=hfpFyS1o3KeCpGtR654apX9UFPE%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWjoKsLYcbGnpkAULCsHjQA3K761EmOwF464L4nvdN5yiMHkIJj5agYUbhl4lWdI"
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
