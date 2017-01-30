import { IHaveDisplayName } from './IHaveDisplayName';

export interface IActivate {

    readonly isActive: boolean;

    activate(params:any, routeConfig:any, navigationInstruction:any): void;

}

export interface IChild {
    parent: any;
}

export interface IParent {
    getChildren(): Array<any>;
}

export interface IScreen extends IHaveDisplayName, IActivate {}


export abstract class Screen implements IChild, IHaveDisplayName, IActivate {

    private _displayName: string = '';
    private _isActive: boolean = false;
    private _parent: any;

    public get displayName(): string {
        return this._displayName;
    }

    public set displayName(value: string) {
        if (this._displayName && this._displayName === value) {
            return;
        }

        this._displayName = value;            
    }

    // public isActive: () => boolean = () => { 
    //     return this._isActive; 
    // } 

    public get isActive(): boolean {
        return this._isActive;
    }

    public get parent(): any {
        return this._parent;
    }

    public set parent(value: any) {
        if (this._parent === value) {
            return;
        }

        this._parent = value;
    }

    public activate(params, routeConfig, navigationInstruction): void {
        this.onActivate(params, routeConfig, navigationInstruction);
    }

    protected abstract onActivate(params, routeConfig, navigationInstruction): void;

    
}

export abstract class Conductor<T> extends Screen {

    private readonly _items: Array<T> = new Array<T>();

    public items: () => Array<T> = () => {
        return this._items;
    } 

    // protected onActivate(params, routeConfig, navigationInstruction) {
    //     console.log('OnActivate: \n \t Params - ' + params);
    // }


}
