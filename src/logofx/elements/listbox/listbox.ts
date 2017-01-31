import { ListBoxItem } from './listboxitem';
import { autoinject, customElement, bindable, bindingMode, observable, View } from 'aurelia-framework';
import * as Core from '../../Core';

@customElement('listbox')
//@autoinject()
export class listbox {
    @bindable() context: any;
    @bindable()
    itemssource: any[];

    @bindable(bindingMode.oneWay) readonly items: Array<ListBoxItem> = [];

    private _subscription: any;
    
    
    constructor() {   
    }

    clbk(){}

    bind(bindingContext: Object,overrideContext: Object) {
        alert('bind');
        Core.getDefaultObserverLocator()
            .getObserver(this, 'context')
            .subscribe((newValue, oldValue) => {
                alert(newValue);
            });
        
        Core.getDefaultObserverLocator()
            .getArrayObserver(this.itemssource)
            .subscribe('clbk', (changes) => {
                this.items.splice(0, this.items.length)
                this.itemssource.forEach(item => 
                    { 
                        alert(this.context)
                        return this.items.push(<ListBoxItem>{datacontext: item, context: this.context});
                    });
            });
        
    }
    // created(owningView: View, myView: View) {
    //     alert(myView)
    // }

    

    // attached() {
    //     alert('attacched')
    // }

    // unbind() {
        
    // }
    
    contextChanged(newValue) {
        if (newValue) {
            
        }

        alert(this.context)
    }
}