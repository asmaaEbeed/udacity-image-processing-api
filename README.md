# Web Development Advanced Track
## FWD with UDACITY
### Backend with Node.js 
# Image processing API
### First Project of UDACITY Nano-Degree Program

## Startup endpoint
'/' => always returns status 200 to be sure app working successfully.

## Install npm package
you need to run:
```bash
npm install
```

## Steps for image processing
1- enter image you need to resize in assets/full directory
2- To create thumb copy:
GET /api/images/?filename={filename.jpg}&height={height}&width={width}
if you don't enter height or width or both..
Don't worry... project will resize it to 100*100 dimensions..
But be sure to enter valid image name..


## Scripts


To build production version:
```bash
npm run build
```

For testing:
```bash
npm run test
```

For prettier:
```bash
npm run prettier
```
Using lint:
```bash
npm run lint
```

run application:
```bash
npm run start
```




