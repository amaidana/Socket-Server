import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const usersConnected = new UserList();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersConnected.add(user);
}

export const disconnectClient = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usersConnected.delete(client.id);
    });
}

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('Mensaje recibido: ', payload);
        
        io.emit('new-message', payload);
    });
}

// Escuchar configuración de usuario
export const userConfig = (client: Socket, io: socketIO.Server) => {
    client.on('user-config', (payload: { name: string }, callback: Function) => {
        usersConnected.updateName(client.id, payload.name);
        
        callback({
            ok: true, 
            message: `Usuario ${payload.name} configurado`
        });
    });
}