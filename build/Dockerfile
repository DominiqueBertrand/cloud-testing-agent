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

ARG DHI_NODE_DEV_IMAGE=dhi.io/node:24-debian12-dev
ARG DHI_NODE_IMAGE=dhi.io/node:24-debian12

FROM ${DHI_NODE_DEV_IMAGE} AS builder

# Use build node environment by default.
ENV NODE_ENV=build

WORKDIR /home/node

RUN corepack enable

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ pkg-config libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock .yarnrc.yml ./
# Show current folder structure in logs
RUN ls -al -R    

RUN yarn install --immutable

COPY --chown=node:node . .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=cache,target=/root/.yarn \
    yarn build \
    && yarn workspaces focus --production

# -- production (production-stage)
# --------------------------------

FROM ${DHI_NODE_IMAGE} AS production

# Use production node environment by default.
ENV NODE_ENV=production

WORKDIR /home/node

# Run the application as a non-root user.
USER node

# Copy the rest of the distribution files into the image.
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

# Show current folder structure in logs
RUN ls -al -R

# Run the application.
CMD [ "node", "dist/main" ]
