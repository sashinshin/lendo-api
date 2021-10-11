# lendo-api

## Run app
#### Install dependecies
```
npm install
```
#### Run app
```
npm start
```
#### Test app
```
npm test
```

## Usage

Run bank partner API and this app concurrently.

### Create application
POST request:
```
/api/applications
```
where body contains
```
{
  "id": string <uuid>
  "first_name": string
  "last_name": string
}
```

### Get application
#### Get by status
GET request:
```
/api/applications?status=completed
/api/applications?status=rejected
/api/applications?status=pending
```
#### Get by id
GET request:
```
/api/applications/string<uuid>
```
#### Get all
GET request:
```
/api/applications
```
