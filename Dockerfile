FROM node:20-alpine
LABEL org.opencontainers.image.source="https://github.com/sanduDM/DevOps-CI-CD-Monitoring"
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