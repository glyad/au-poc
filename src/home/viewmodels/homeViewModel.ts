import { IScreen, Conductor } from './../../logofx/view-model/screen';

export class HomeViewModel extends Conductor<IScreen> {

    canActivate(params, routeConfig, navigationInstruction) {
        
    }

    protected onActivate(params, routeConfig, navigationInstruction) {
        console.log('OnActivate: \n \t Params - ' + params);
    }

    public canDeactivate(): boolean {
        return true;
    }
}