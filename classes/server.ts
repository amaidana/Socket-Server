import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;

    private static _instance: Server;
    private httServer: http.Server;

    private constructor () {
        this.app = express();
        this.port = SERVER_PORT;
        this.httServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httServer, {
            cors: {
                origin: true, 
                credentials: true,
            }
        });

        this.listenSockets();
    }

    public static get instance (): any   {
        return this._instance || (this._instance = new this())
    }

    start (callback: Function) {
        this.httServer.listen(this.port, callback());
    }

    private listenSockets () {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {
            console.log('Cliente conectado');

            // Estar pendiente de los mensajes
            socket.message(client, this.io);

            // Desconectar 
            socket.disconnect(client);
        });
    }
}