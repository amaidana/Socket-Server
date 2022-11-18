import { User } from "./user";

export class UserList {
    private userList: User[] = [];

    constructor() {}

    // Agregar usuario
    public add(user: User) {
        this.userList.push(user);
        console.log(this.userList);
        return user;
    }

    public updateName(id: string, name: string) {
        for (let user of this.userList) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }

        console.log('Actualizando usuario');
        console.log(this.userList);
    }

    // Obtener lista de usuarios
    public getUserList() {
        return this.userList;
    }

    // Obtener un solo usuario
    public getUser(id: string) {
        return this.userList.find((user: User) => user.id === id);
    }

    // Obtener usuarios en una sala en particular
    public getUserInRoom(roomName: string) {
        return this.userList.filter((user: User) => user.room == roomName);
    }

    // Borrar un usuario
    public delete(id: string) {
        const tempUser = this.getUser(id);

        this.userList = this.userList.filter((user: User) => user.id !== id)

        console.log(this.userList);
        return tempUser;
    }
}