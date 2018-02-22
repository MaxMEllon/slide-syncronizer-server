# dev
> start development server side of last-session.

    $(npm bin)/saku -p _transpile _hot_reload_server

# prod
> start production server.

    NODE_ENV=production $(npm bin)/babel src --out-dir lib
    $(npm bin)/pm2 start app.json --env production

# _transpile

    $(npm bin)/babel --watch src --out-dir lib

# _hot_reload_server

    $(npm bin)/pm2 kill
    $(npm bin)/pm2 start lib/server.js --env development --watch --no-daemon -f
