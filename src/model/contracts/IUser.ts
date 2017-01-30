import { IModel } from './../../logofx/model';

export interface IUser extends IModel<number> {
    firstName: string;
    lastName: string;
}