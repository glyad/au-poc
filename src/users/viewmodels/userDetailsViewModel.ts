import { IUser } from './../../model/contracts/IUser';
import {ObjectViewModel} from '../../logofx/view-model';

export class UserDetailsViewModel extends ObjectViewModel<IUser> {

    constructor(item: IUser) {
        super(item);
    }

}