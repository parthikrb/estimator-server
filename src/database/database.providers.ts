import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(`mongodb+srv://parthi:One2three@esteamate-x15hu.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true }),
    },
];