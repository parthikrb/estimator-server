export class Participant {
    firstname: string;
    accesscode: string;
    designation: string;

    constructor(firstname: string, accesscode: string, designation: string) {
        this.firstname = firstname;
        this.accesscode = accesscode;
        this.designation = designation;
    }
}