import { ValidationRules, Rule } from 'aurelia-validation';

export interface IEditableObject {

    beginEdit();
    cancelEdit();
    commitEdit();
}

export interface IModel<T> {
    id: T;

    validationRules: ValidationRules;

    rules: Rule<{}, any>[][];

    isNew: boolean;

    readonly isDirty: boolean;

    markClean(): void;
    
}

export class Model<T> implements IModel<T>, IEditableObject {
    
    id: T;

    private _isNew: boolean = true;
    private _isDirty: boolean = false;
    private _validationRules: ValidationRules;
    private _rules: Rule<{}, any>[][];
    private _memento: IModel<T> | null | undefined;
    private _isEditing: boolean = false;

    // public  validationRules: () => ValidationRules = () =>{
    //     return this._validationRules;
    // }

    public get isNew(): boolean {
        return this._isNew;
    }

    public set isNew(value: boolean) {
        if (value === this._isNew) {
            return;
        }

        this._isNew = value;        
    }

    public get isDirty(): boolean {
        return this._isDirty;
    }

    public get validationRules(): ValidationRules {
        return this._validationRules;
    }

    public set validationRules(value: ValidationRules) {
        if (value === this._validationRules) {
            return;
        }
        
        this._validationRules = value;
    }

    public get rules(): Rule<{}, any>[][] {
        return this._rules;
    }

    public set rules(value: Rule<{}, any>[][]) 
    {
        if (value === this._rules) {
            return;
        }

        this._rules = value;
    }

    public get isEditing(): boolean {
        return this._isEditing;
    }
    
    public markClean() {
        this._isDirty = false;
    }

    toString(): string {
        return makeString(this);
    }

    public beginEdit(): void {
        this._isEditing = true;
        this._memento = JSON.parse(JSON.stringify(this));;
    }

    public cancelEdit(): void {
        Object.assign(this, this._memento);
        this._isEditing = false;
    }

    public commitEdit(): void {
        this._memento = null;
        this._isEditing = false;
    }
}

/**
 * Checks if the given argument is undefined.
 * @function
 */
export function isUndefined(obj: any): boolean {
    return (typeof obj) === 'undefined';
}

/**
 * Checks if the given argument is a string.
 * @function
 */
export function isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object String]';
}

const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const has = function(obj: any, prop: any) {
    return _hasOwnProperty.call(obj, prop);
};

export function makeString<T>(item: T, join: string = ','): string {
    if (item === null) {
        return 'COLLECTION_NULL';
    } else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    } else if (isString(item)) {
        return item.toString();
    } else {
        let toret = '{';
        let first = true;
        for (const prop in item) {
            if (has(item, prop)) {
                if (first) {
                    first = false;
                } else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + (<any>item)[prop];
            }
        }
        return toret + '}';
    }
}


