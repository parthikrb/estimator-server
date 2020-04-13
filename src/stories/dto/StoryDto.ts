import { Sprint } from './../../sprints/interfaces/sprint.interface';
export class StoryDto {
    readonly _id?: string;
    readonly sprint: Sprint;
    readonly storyname: string;
    readonly storyPoints: object;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly created_by?: string;
    readonly updated_by?: string;
}