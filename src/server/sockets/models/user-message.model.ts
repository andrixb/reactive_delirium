import { IMessage, IUser } from '.';

export class UserMessage implements IMessage{
    constructor(public from: IUser, public content: string) {
    }
}
