import { Connection } from "mongoose";
import { StorySchema } from './schemas/stories.schema';


export const storiesProviders = [{
    provide: 'STORY_MODEL',
    useFactory: (connection: Connection) => connection.model('story', StorySchema),
    inject: ['DATABASE_CONNECTION']
}];