# Post to Stop War

![alt text](./public/logo.svg)

This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start development
- `npm i`
- `npm run start`
- <http://localhost:3000>

## Deploy

We use [surge.sh](https://surge.sh/) for static serving. Also pay for Pro version to allow use custom domain with HTTPS.

To deploy just run `npm run deploy`. Currently, we also publish to GitHub Pages. Maybe it is good idea to avoid paying for Surge Pro just for HTTPS.

## Optimizing images 

[Full guide](https://www.notion.so/rudnitskih/Post-To-Stop-War-f69b2f47a8cc44329381099aacaf558a#b5e25867b93940ffa9897f2b9692c75a) 
Please read it before understand why we need it.

There is script `prepare-images.sh` which can prepare initial gallery files to web.

To run the script:

- [install](https://imagemagick.org/script/download.php) Imagemagick
- create folders in root `mkdir posters && mkdir posters_optimized`
- put original files in `./posters`
- run `./prepare-images.sh`
- copy files from `posters_optimized` to Google Drive folder (see Full guide)
