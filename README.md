# --- Caffe Library ---
## Mac Three step guide to running application
Open three terminal windows. In all three cd to the project directory.

## 1. Starting the Node Server
```
$ cd server/
```
Install missing packages:
```
$ npm install
```
then run either:
```
$ node index.js
```
or:
```
$ npx nodemon index.js
```
or:
```
$ nodemon
```


## 2. Starting up MongoDB
### Install with Homebrew (MacOSx)
If you haven't previously installed docker: https://brew.sh/ <br />
Install docker
```
$ brew install docker
```
Once docker is installed:
```
$ cd mongo/
```
list all directories and if mongodb_data 
does not exist create mongodb_data directory
```
$ mkdir mongodb_data
```
then run:
```
$ docker-compose up
```
or detached :
```
$ docker-compose up -d
```


## 3. Starting up frontend  
In new tab/window:
```
$ cd client/
```
Install missing packages:
```
$ npm install
```
then run:
```
$ yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000/books) to view it in the browser.
