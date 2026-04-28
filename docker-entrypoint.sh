#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Start the server
echo "Starting ApexBank API..."
exec php artisan serve --host=0.0.0.0 --port=$PORT
