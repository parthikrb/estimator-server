import { Connection } from 'mongoose';
import { SprintSchema } from './schemas/sprints.schema';


export const sprintsProviders = [{
    provide: 'SPRINT_MODEL',
    useFactory: (connection: Connection) => connection.model('sprint', SprintSchema),
    inject: ['DATABASE_CONNECTION']
}];