# dev
> start development server side of last-session.

    $(npm bin)/saku -p _transpile _reload_server

# prod
> start production server.

    NODE_ENV=production $(npm bin)/babel src --out-dir lib
    $(npm bin)/pm2 start app.json --env production -i 4

# fmt
> Auto format sources by prettier.

    $(npm bin)/prettier --write src/**/*.js

# _transpile

    $(npm bin)/babel --watch src --out-dir lib

# _reload_server

    $(npm bin)/pm2 kill
    DEBUG=server*,engine:* $(npm bin)/pm2 start app.json --env development --watch --no-daemon -f

