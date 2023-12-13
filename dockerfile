FROM node:18

WORKDIR /usr/src/app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm install
RUN cd frontend && npm install

COPY backend ./backend
COPY frontend ./frontend
COPY imgs ./imgs

RUN cd frontend && npm run build
RUN cd backend && npm run build

CMD [ "npm", "run", "start:prod", "--prefix", "backend" ]