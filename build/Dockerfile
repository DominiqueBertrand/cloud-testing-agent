# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:lts-alpine AS builder

# Use build node environment by default.
ENV NODE_ENV build

WORKDIR /home/node

COPY package*.json ./
COPY build/ecosystem.config.js ./
# Show current folder structure in logs
RUN ls -al -R    

RUN yarn ci

COPY --chown=node:node . .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn build \
    && yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

# -- production (production-stage)
# --------------------------------

FROM node:lts-alpine AS production

# Use production node environment by default.
ENV NODE_ENV production

# Install pm2 globally
RUN yarn global add pm2

WORKDIR /home/node

# Run the application as a non-root user.
USER node

# Copy the rest of the distribution files into the image.
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/ecosystem.config.js ./

# Show current folder structure in logs
RUN ls -al -R

# Run the application.
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]