# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY public /app/public
RUN npm install --silent
COPY . /app
RUN /
  REACT_APP_DEV_API_KEY=AIzaSyC7lJ2lmQOfGzhdRvMgDrJHaU5qcVRqgPA /
  REACT_APP_DEV_AUTH_DOMAIN=savvy-palace-259505.firebaseapp.com /
  REACT_APP_DEV_DATABASE_URL=https://savvy-palace-259505.firebaseio.com /
  REACT_APP_DEV_PROJECT_ID=savvy-palace-259505 /
  REACT_APP_DEV_STORAGE_BUCKET=savvy-palace-259505.appspot.com /
  REACT_APP_DEV_MESSAGING_SENDER_ID=978131684388 /
  REACT_APP_PROD_API_KEY=AIzaSyC7lJ2lmQOfGzhdRvMgDrJHaU5qcVRqgPA /
  REACT_APP_PROD_AUTH_DOMAIN=savvy-palace-259505.firebaseapp.com /
  REACT_APP_PROD_DATABASE_URL=https://savvy-palace-259505.firebaseio.com /
  REACT_APP_PROD_PROJECT_ID=savvy-palace-259505 /
  REACT_APP_PROD_STORAGE_BUCKET=savvy-palace-259505.appspot.com /
  REACT_APP_PROD_MESSAGING_SENDER_ID=978131684388 /
  PUBLIC_URL=https://my.dugut.app /
  npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
