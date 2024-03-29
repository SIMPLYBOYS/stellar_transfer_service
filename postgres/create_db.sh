#!/bin/bash
set -e

POSTGRES_USER="postgres"

DB_NAME="transfer_service"

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${DB_NAME}"

$POSTGRES <<EOSQL
CREATE DATABASE ${DB_NAME} OWNER ${POSTGRES_USER};
EOSQL

echo "Creating schema..."
psql -d ${DB_NAME} -a -U${POSTGRES_USER} -f /schema.sql

echo "Populating database..."
psql -d ${DB_NAME} -a  -U${POSTGRES_USER} -f /data.sql