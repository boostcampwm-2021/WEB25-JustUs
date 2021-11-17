FROM node:16.0.0-alpine as builder
WORKDIR /usr/src/app
COPY ./package.json ./
RUN yarn
COPY . .
ARG REACT_APP_NCP_CLOUD_ID
ARG REACT_APP_SERVER_URL
ENV REACT_APP_NCP_CLOUD_ID=$REACT_APP_NCP_CLOUD_ID
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html