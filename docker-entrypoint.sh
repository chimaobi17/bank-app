#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if we have a valid cloud database host before running migrations
if [ -z "$DB_HOST" ] || [ "$DB_HOST" = "host.docker.internal" ] || [ "$DB_HOST" = "localhost" ]; then
    echo "⚠️ Skipping database migrations: DB_HOST is either empty or pointing to a local environment."
    echo "Please configure a valid cloud Oracle database in your Render Environment Variables."
else
    echo "Running database migrations..."
    # We use '|| true' so that if migrations fail (e.g. temporary DB outage), the deployment doesn't completely crash.
    php artisan migrate --force || echo "⚠️ Database migrations failed. Continuing startup..."
fi

# Start the server
echo "Starting ApexBank API..."
exec php artisan serve --host=0.0.0.0 --port=$PORT
