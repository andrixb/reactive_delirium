import { IUser } from './iuser.interface';

export interface IMessage {
    from: IUser;
    content: string;
}
