#!/bin/sh
set -eu

DOMAIN=${REACT_APP_DOMAIN:-""}
LEGACY_AC_INTEGRATED=${LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED:-true}

ENV_JSON='{"REACT_APP_DOMAIN":"'"$DOMAIN"'", "KEYCLOAK_JSON":"'"$DOMAIN"'/keycloak.json", "LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED":"'"$LEGACY_AC_INTEGRATED"'"}'
ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/"REACT_APP_ENV"/'"$ESCAPED_ENV_JSON"'/g' $HOME/app-builder/index.html

exec "$@"
