import { computedFrom } from 'aurelia-framework';
import { ViewModelCreatorService } from './../../logofx/view-model/ViewModelCreatorService';
import { IViewModelCreatorService } from './../../logofx/view-model/IViewModelCreatorService';
import { autoinject } from 'aurelia-framework';
import { UserDetailsViewModel } from './userDetailsViewModel';
import { UserListViewModel } from './userListViewModel';
import { IScreen, Conductor } from './../../logofx/view-model/screen';

@autoinject
export class UsersRootViewModel extends Conductor<IScreen> {
    
    private _userListViewModel: UserListViewModel;
    private _userDetailsViewModel: UserDetailsViewModel;
    private readonly _viewModelCreatorService: IViewModelCreatorService;

    constructor(viewModelCreatorService: ViewModelCreatorService) {
        super()

        this._viewModelCreatorService = viewModelCreatorService;
    }

    public get userListViewModel(): UserListViewModel {
        if (!this._userListViewModel) {
            this._userListViewModel = this._viewModelCreatorService.create(UserListViewModel);
        }

        return this._userListViewModel;
    }

    public get userDetailsViewModel(): UserDetailsViewModel | undefined {
        if (!this._userListViewModel.users.getSelectedItems() && this._userListViewModel.users.getSelectedItems().length > 0) {
            return undefined;
        }
        return this._userListViewModel.users.getSelectedItems()[0];
    }

    protected onActivate() {}
}