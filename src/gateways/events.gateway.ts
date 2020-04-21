import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Squad } from 'src/squads/interfaces/squads.interface';
import { User } from 'src/users/interfaces/user.interface';
import { Logger } from '@nestjs/common';



@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {

    @WebSocketServer()
    server: Server;

    users = 0;
    private logger = new Logger('Gateway');

    afterInit() {
        this.logger.log('Gateway initialized');
    }

    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
        this.users++;
        this.server.emit('users', this.users);
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
    async enterRoom(client: Socket, data: string): Promise<GatewayEventInterface<{ room: string, username: string, roles: string }>> {
        try {
            client.join(data);

            const clientIdList: string[] = await new Promise(resolve => {
                this.server
                    .of('/')
                    .in(data)
                    .clients((err, clients: string[]) => resolve(clients));
            })

            const userNames: User[] = clientIdList
                .map((clientId: string) => {
                    return (this.server.sockets.connected[clientId] as any).decoded_token.username;
                });
            return;
            // return { event: 'usersRoom', data: userNames };
        } catch {
            // return { event: 'usersRoom', data: [] };
        }
    }

}

interface GatewayEventInterface<T> {
    event: string;
    data: T;
}