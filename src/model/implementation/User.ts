import { IUser } from './../contracts/IUser';
import { transient } from 'aurelia-framework';
import { Model } from './../../logofx/model';

@transient
export class User extends Model<number> implements IUser {

    firstName: string = '';
    lastName: string = '';

}