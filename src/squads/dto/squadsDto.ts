export class SquadDto {
    readonly _id: string;
    readonly squadname: string;
    readonly posm: object[];
    readonly accessCode?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly createdBy?: string;
    readonly updatedBy?: string;
  }