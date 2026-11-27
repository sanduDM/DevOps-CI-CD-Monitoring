FROM node:20-alpine
WORKDIR /usr/src/app

# Copy dependency files first so Docker can cache this layer
COPY app/package*.json ./
RUN npm install --omit=dev

# Copy the source code after
COPY app/ .

ENV PORT=3000
EXPOSE 3000

# Run as a non-root user (safer)
USER node
CMD ["npm", "start"]