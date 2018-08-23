import { Message, User } from '.';

export class UserMessage extends Message{
    constructor(from: User, content: string) {
        super(from, content);
    }
}
