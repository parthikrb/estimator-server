import { Connection } from "mongoose";
import { SquadSchema } from "./schemas/squad.schema";


export const squadsProviders = [{
    provide: 'SQUAD_MODEL',
    useFactory: (connection: Connection) => connection.model('Squad', SquadSchema),
    inject: ['DATABASE_CONNECTION']
}];