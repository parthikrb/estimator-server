import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Squad } from 'src/squads/interfaces/squads.interface';
import { Logger } from '@nestjs/common';



@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    users = [];

    private logger = new Logger('Gateway');

    afterInit() {
        this.logger.log('Gateway initialized');
    }

    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async message(client: Socket, data: any): Promise<GatewayEventInterface<{ text: string, username: string, room: Squad }>> {
        const event = 'message';
        const payload = { text: data.message, username: data.username, room: data.room };
        this.logger.log(`Client Message ${JSON.stringify(payload)}`);
        client.to(data.room).emit(event, payload);
        return { event, data: payload };
    }

    @SubscribeMessage('joinRoom')
    async enterRoom(client: Socket, data: any): Promise<GatewayEventInterface<{ username: string, roles: string }>> {
        try {
            const obj = {};
            this.logger.log(`User ${data.username} with ${data.roles} role has joined ${data.room} room`);
            client.join(data.room);
            obj['room'] = data.room;
            obj['username'] = data.username;
            obj['role'] = data.roles;
            obj['id'] = client.id;
            this.users.push(obj);
            this.logger.log(`Connected Users: ${JSON.stringify(this.users)}`);

            const event = 'roomUsers';
            const payload = this.users.reduce((r, a) => {
                (r[a['room']] = r[a['room']] || []).push(a);
                return r;
            }, {});

            this.logger.log(`Connected Users: ${JSON.stringify(payload)}`);
            client.broadcast.emit(event, payload);

            return { event, data: payload };;
        } catch (error) {
            this.logger.error(error);
        }
    }

    @SubscribeMessage('vote')
    async castVote(client: Socket, data: any): Promise<GatewayEventInterface<any>> {
        try {
            console.log('Inside');
            const _users = [...this.users];
            _users.forEach(user => {
                if (user.id === client.id) {
                    user['vote'] = data.vote;
                    user[user.role] = data.vote;
                }
            });
            this.logger.log(`User Voted, ${JSON.stringify(_users)}`);
            const event = 'collectVotes';
            const payload = _users.reduce((r, a) => {
                (r[a['room']] = r[a['room']] || []).push(a);
                return r;
            }, {});
            client.broadcast.emit(event, payload);

        } catch (error) {
            this.logger.error(error);
        }
        return;
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);

        const userToDelete = [client.id];

        this.users.reduceRight((acc, obj, index) => {
            if (userToDelete.indexOf(obj.id) > -1) this.users.splice(index, 1);
        }, {})

        const event = 'roomUsers';
        const payload = this.users.reduce((r, a) => {
            (r[a['room']] = r[a['room']] || []).push(a);
            return r;
        }, {});

        this.logger.log(`Available Users: ${JSON.stringify(payload)}`);
        client.broadcast.emit(event, payload);
    }

}

interface GatewayEventInterface<T> {
    event: string;
    data: T;
}