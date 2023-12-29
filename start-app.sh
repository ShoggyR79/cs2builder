#!/bin/bash

echo "Building frontend..."
cd csgo-inventory-frontend && npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Frontend build complete."
    echo "Starting backend..."
    cd ../csgo-inventory-backend && pm2 start ./index.cjs
else
    echo "Frontend build failed. Backend will not start."
fi
