ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install MongoDB command line tools if on buster and x86_64 (arm64 not supported)
ARG MONGO_TOOLS_VERSION=5.0
RUN . /etc/os-release \
    && if [ "${VERSION_CODENAME}" = "buster" ] && [ "$(dpkg --print-architecture)" = "amd64" ]; then \
        curl -sSL "https://www.mongodb.org/static/pgp/server-${MONGO_TOOLS_VERSION}.asc" | gpg --dearmor > /usr/share/keyrings/mongodb-archive-keyring.gpg \
        && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] http://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/${MONGO_TOOLS_VERSION} main" | tee /etc/apt/sources.list.d/mongodb-org-${MONGO_TOOLS_VERSION}.list \
        && apt-get update && export DEBIAN_FRONTEND=noninteractive \
        && apt-get install -y mongodb-database-tools mongodb-mongosh \
        && apt-get clean -y && rm -rf /var/lib/apt/lists/*; \
    fi
