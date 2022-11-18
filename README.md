# JayPay 

JayPay is a payroll software that makes life easier for employees, employers, and HR. With JayPay, there’s no need to worry about delayed payments, forgotten weekly hours, or using multiple platforms for verification. Our intuitive system provides you with an all-in-one platform to manage the entire employment ecosystem of your department.

[Deployed App](https://jaypay-lego.herokuapp.com/) \
[Deployed Backend](https://jaypay-lego-api.herokuapp.com/)

**Team**

|        Name       |        JHU Email        | GitHub Username |
| ----------------- | ----------------------- | --------------- |
| Mathias Insley    | minsley1@jhu.edu        | agelas          |
| Andrew Suh        | wsuh1@jhu.edu           | andrewsuh98     |
| Nishant Bundela   | nbundel1@jh.edu         | nishantbundela  |
| Ying Zhang        | yingchuan.zhang@jhu.edu | yingblings      |
| Shruti Hegde      | shegde3@jhu.edu         | shrutiihegde    |
| Venkat Mukthineni | vmukthi1@jhu.edu        | venkat8900      |


**Advisors** 

|      Name       |    JHU Email    | GitHub Username |
| --------------- | --------------- | --------------- |
| Damiano Marsili | dmarsil1@jh.edu | damianomarsili  |

## Documentation

* [Project Document](https://docs.google.com/document/d/1WJ_VGEFXYR185Ogi1Q8ahgR2zHhob9sWyKQ692pYvRQ/edit?usp=sharing)
* [User Manual](https://cs421sp22-homework.github.io/project-team-14-lego/)
* [API Documentation](https://docs.google.com/document/d/1Y0ryWs3JGa9AAh2akDfyhTMANjJ5D8nSh9iElVN5LNI/edit#heading=h.px1fs4sh8z06)

## Installing / Getting started

This repository contains both the frontend and the backend for the JayPay node.js application. The frontend is located in the subdirectory ```code/frontend``` and the backend is located in the subdirectory ```code/backend```. Below are the instructions to install and run the application on your local computer. 

### Backend

To install and run the backend node application, open a terminal window in the subdirectory ```code/backend```. Then run the following commands:
```shell
npm install
npm run build
npm start
```
This will start the server at port 8000. To access the local backend, visit ```http://localhost:8000```

### Frontend

To install and run the front react.js application, open a terminal window in the subdirectory ```code/frontend```. Then run the following commands:
```shell
npm install
npm run build
```
This will install all the dependencies and build the production application in the subdirectory ```./build```.
```shell
serve -s build
```
This will then statically serve the production application on your local server. You will get a terminal message displaying the local address where the application is deployed. Use a web brower to access the locally deployed application. 


### Emailserver

To run the email notification service, open a terminal window in the subdirectory ```code/emailservice```. Then run the following commands:
```shell
npm install
node server.js
```
This will install all the node modules needed for the email service and start the server.

## Developing

### Developing the Frontend
Make sure serve is installed. Entering `serve --help` in your terminal should return something. If not, then install serve with `npm install -g serve`.

1. Navigate into the `frontend` folder and run `npm install`.
2. Run `npm dev` in your terminal.
3. You're all set- please don't push `node_modules` to the remote repository.

```shell
# In the frontend folder
npm install
npm dev
```

### Developing in a Docker Container
1. Follow step 1 in **Setting up a Docker Container** from below.
2. Run `docker-compose up` in your terminal. Go to docker desktop, and you should see a container running on port:3000. Note that nodemon will trigger server restarts when you change your code locally. However, this process can take a while, so for frontend work it is recommended to just develop locally by firing up the frontend via `npm dev`. 

```shell
# In the frontend folder
docker-compose up
```

## Running JayPay through Docker

### Setting up a Docker Container

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop). Create a docker account so in the future we can just pull docker images from docker hub. It's also highly recommended to download the vscode extensions for Docker- Docker and Remote Explorer.
2. In your project folder, navigate to the `code` folder in your terminal, and run `docker build . -t jaypay`. The `.` tells docker to build from your current folder (should be `code`), and `-t` gives a tag to the image. You can tag the image anything you want, not just `jaypay`. In docker desktop, you should see `jaypay` as a local image. 
3. Once the image is built, run `docker run --rm -p 3000:3000/tcp jaypay` in your terminal. The `--rm` flag is optional, it just removes any intermediate containers after a successful build. `-p 3000:3000/tcp` is very important if you want to make your life easier. It explicitly maps the 3000 tcp port from inside the docker container to the 3000 port on your local host. So after you navigate to `localhost:3000`, you should see the frontend. You can also build the image without specifying a port, but you'll have to go to Docker Desktop and find which port it's running on (alternatively run `docker ps` in your terminal). 

```shell
# In code folder
docker build . -t jaypay
docker run --rm -p 3000:3000/tcp jaypay
```

## Deploying Frontend to Heroku

### Deploying with Heroku Container Registry
You can deploy the frontend multiple ways, including with Github/Github actions, Heroku's Container Registry, or the Heroku client. Here's how to do it with the Container Registry. Note that you need to have the Heroku CLI installed.

```shell
# In the code folder, login to Heroku
heroku login

# Sign into container registry
heroku container:login

# Build the Dockerfile in the current directory. This step will take a while
heroku container:push web

#Release the newly pushed images to deploy app
heroku container:release web
```
Note that if you have an already built Docker image and don't want to waste time/space on building another Docker image, you can tag the pre-existing image and release that instead.

```shell
# Tag the pre-existing image, <app> would be jaypay-lego, <process-type> is web
docker tag <image> registry.heroku.com/<app>/<process-type>

heroku container:release <process-type>
```

## Deploying Backend to Heroku

### Creating the Docker Image
Execute the following commands to generate the Docker image of the backend, then tag it with the heroku registry and process to deploy using the Heroku Container Registry (next step).

```shell
# Go to the backend folder

# Generate Docker image
docker build . -t jaypay-backend

# Tag the image
docker tag jaypay-backend registry.heroku.com/jaypay-lego-api/web
```

### Deploying with Heroku Container Registry
You can deploy the backend using the Heroku Container Registry, similar to the backend.

```shell
# In the backend folder, login to Heroku
heroku login

# Point the Heroku remote to the backend
heroku git:remote --app jaypay-lego-api

# Sign into container registry
heroku container:login

# Build the Dockerfile in the current directory. This step will take a while
heroku container:push web

#Release the newly pushed images to deploy app
heroku container:release web
```
Note that if you have an already built Docker image and don't want to waste time/space on building another Docker image, you can tag the pre-existing image and release that instead.

```shell
# Tag the pre-existing image, <app> would be jaypay-lego, <process-type> is web
docker tag <image> registry.heroku.com/<app>/<process-type>

heroku container:release <process-type>
```

### Rolling Back Heroku Deployments
In the event that something you do breaks the deployment, Heroku makes it easy to rollback to a working version. Simply find the version that works and tell Heroku to rollback to that deployment.

```shell
heroku releases

# Your terminal will show a list of deployments, with a version designated by a number (v1, v2, etc.) Find the version you want to roll back to and rollback. 

heroku rollback <v(number)>
```

