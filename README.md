# Dockerization and experience models reference project

## todo:
- remove @backbase/sdlc-convert from dependencies
- install @bb-cli@3.0.0
- update npm scripts
- update the code snippets in the readme file

!important

Before running commands locally the WEB-SDK collection needs to be provided in the `./collections` folder.

## Experience model for Application manager

Backbase applications are rendered dynamically based on the model stored in Backbase CX. Application manager (or its older version - Experience manager) can work with it through a portal server.

There are 2 formats of the experience:
- provisioning package
- json

### Provisioning package

This is our legacy format for the experience model. This is a binary zip archive, that consists of several other archives. The end format of the data itself is `xml`.

It is needed to export it from one of the managers' applications if you want to store it somewhere or to convert it to a more convenient JSON format.

The example of the provisioning package for this project exported from the experience manager can be found in the `experience/provisioning-package` folder, which is named `example.zip`.

### JSON

It is the same data with the experience model but represented more conveniently with several key features:

- human-readability
- version control support 

There is a command line utility, that will help getting the model in the JSON format from the provisioning package. After installition of `@bb-cli/bb` globally or as a developer dependency for a project, it is needed to perform onle one step:

```
  npm run create:json:experience
```

Please, check the npm scripts section in the `package.json` file in the current reference project to see the example of using the command. The example of the outputed files can be found in the `experience/json` folder. 

If experience in provisioning package format is needed after working with JSON files, it can be easily created with the following command:

```
  npm run create:provisioning-package:experience
```

The output can be found in `./experience/provisioning-package-output` (the output localtion can be changed in the `experince.json`, check the `provisioning.default.outputDir` property). There will be 2 files - `cx.zip` and `portal.zip`, which represented the experience catalog needed for rendering and the experience itself.

### Local development

#### General information

Backabse Experience is multi-page application that consists of at least three pages - home, login and error one (often called something-went-wrong). In Widget Architecture 3 (WA3) for frontend applications, the Angular Single Page Application (SPA) is dynamically rendered based on the model stored in Backbase CX. The model that the SPA is receiving is what we call simplified model for home page.

Simplified model is a simplification of the Backbase Page Model that is returned by page API endpoints of portal server. Its structure is similar to model.xml widget object definition defined for every widget / container. To enable local development you can extract home page (its simplified model) and continue to work as with regular angular application.

Follow next steps:

1. Create the simplified model for home page

For the current reference project just run:

```
  npm run create:home:page:mock
```

The output result can be found `./apps/example/mocks/home.page.mock.json`.

2. Update `environment.ts` to include page model into bootstraping

```
export const environment = {
  production: false,
  mockProviders: [createMocksInterceptor()],
  bootstrap: {
    pageModel: (pageModelMock as Container).children[0],
    services,
  },
}
```

Additional notes:
- Type casting is needed to bring some clear structure to the imported mock file.
- The pageModel is wrapped into a manageable area container in the provisioning package.
  It is used only in the application/experience managers to bring some manageability rules.
  It is completely redundant in the local development.

3. Serve application localy as regular angular one

```
  ng serve
```

## Dockerization

Dockerization is the process of creating docker images with any data to enable running it as a container. Backbase is providing the possibility to create the container with the application that is relying on the experience model based on Nginx that can be either ran directly, or deployed in Kubernetes environments.

This approach allows to serve experiences with a lower TCO for the supporting infrastructure, by making a few compromises that increase the efficiency and scalability of the underlying runtime:

!Important
With this approach, it is not possible to change the application layout at runtime through Application or Experience manager. Application content and configuration is defined at build time, and requires a new build in order to perform changes.

### Pre-requisites

- Experience model in JSON format
- Application container following WC3 architecture

### How-to dockerize application

1. Add/change environments property of the `experience.json` file to specify new point of deployment:

```
[...]
"docker": {
  "provisioning": {
    "type": "nginx", 
    "outputDir": "<OUTPUT_DIR_PATH>",
    "baseHref": "<PROTOCOL>://<HOST>[:<PORT>]/[<APP_NAME>]",
    "apiRoot": "<PROTOCOL>://<HOST>[:<PORT>]/<API>"
  },
  "authorization": {
    "kind": "hybrid",
    "authUrl": "<PROTOCOL>://<HOST>[:<PORT>]/<AUTH>",
    "clientId": "<CLIENT_ID>",
    "realm": "<REALM>",
    "scope": "<SCOPE>",
    "landingPageUrl": "<LANDING_PAGE_URL>",
    "loginPageUrl": "<LOGIN_PAGE_URL>"
  }
}
[...]
```

Notes:
- all the values that contain a value with this format `<XXXXXX>` are values that can be changed according to the project needs;
- the values between square brackets, like this `[<XXXX>]` are optional or not required;
- detailed explanation of every field can be found at the very end of this file.

2. Run npm script to convert application to a source of the docker container

```
  npm run create:docker:container
```

The result can be found in the `./experience/docker` folder, check the additionals to get the reasoning behind each file.

3. Get it up and running

In the `./experience/docker` folder:

```
docker build --tag <APP_NAME>:<APP_VERSION> .
```

or to get iy up and running with docker-compose:

```
docker-compose up -d --build
```

The application from the reference project can be found at `http://127.0.0.1:8080/example-ang/example` (redirect is posible due to router configuration).

### Additionals

1. Docker folder explained

- `statics` - A folder containing all dependencies and assets of your experience.
- `default.conf.template` - A default Nginx configuration template with production-ready configuration. Supports environment-variables substitution at startup.
- `Dockerfile` - The container definition file.
- `envsubst-on-html-templates.sh` - A supporting script to enable Nginx and app configuration through environment variables.

2. Docker environment field explanation

Provisioning
- type : This value must not be changed as it’s the type used to inform @backbase/sdlc-convert that you want to create a Docker container that makes use of NGINX.
- outputDir : This is the path to the directory where all the Docker assets will be stored on executing the packagecommand.
- baseHref : This is the url path to your app when it gets served from statics. The port used on baseHref will become the open port on your Docker container
- apiRoot : This is the url path to your Gateway. 
Authorization
- kind : This value must  not be changed as only the apps that use hybrid authentication are eligible to be packaged in a Docker container.
- authUrl : This is the url path to your authentication server
- clientId, realm and scope are the values needed for an authentication service following the OAUTH2 standards. Read More: https://backstage.forgerock.com/knowledge/kb/article/a66128300#info
- landingPageUrl : This is the url path where the user will be redirected after login.
- loginPageUrl : This is the url path that must be rendered when the user has not been authenticated or when it has been logged out.
