FROM postgres

# Custom initialization scripts
COPY ./create_db.sh /docker-entrypoint-initdb.d/20-create_db.sh
COPY schema.sql /schema.sql
COPY data.sql /data.sql

RUN chmod +x /docker-entrypoint-initdb.d/20-create_db.sh
# CMD ["postgres", "-c", "logging_collector=on", "-c", "log_directory=pg_log", "-c", "log_filename=postgresql-%Y-%m-%d_%H%M%S.log", "-c", "log_statement=all"]