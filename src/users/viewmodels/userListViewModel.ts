import { autoinject } from 'aurelia-framework';
import { IScreen, Conductor } from './../../logofx/view-model/screen';
import { View } from 'aurelia-framework';
import { IDataService } from './../../model/contracts/IDataService';
import { DataService } from './../../model/implementation/DataService';
import { UserDetailsViewModel } from './userDetailsViewModel';
import { IUser } from './../../model/contracts/IUser';
import { WrappingCollection, ObjectViewModel } from '../../logofx/view-model';

@autoinject
export class UserListViewModel extends Conductor<IScreen> {

    private readonly _dataService: IDataService;
    private readonly _list: WrappingCollection;

    constructor (dataService: DataService) {
        super();
       
        this._dataService = dataService;

        this._list = new WrappingCollection(item => { return new UserDetailsViewModel(<IUser>item); } , dataService.users);
    }

    public get users() {
        return this._list;
    }

    created(owningView: View, myView: View) {
        this._dataService.fetchUsers();
    }

    select(value) {
        this._list.unselectAll();
        value.isSelected = true;
    }

    protected onActivate() {}

}