import { ListBoxItem } from './listboxitem';
import { customElement, bindable, bindingMode } from 'aurelia-framework';
import * as Core from '../../Core';

@customElement('listbox')
export class listbox {
    
    @bindable()
    itemssource: any[];

    @bindable(bindingMode.oneWay) readonly items: Array<ListBoxItem> = [];

    @bindable() context: any;
    
    constructor() {
        
    }

    clbk(){}

    bind(bindingContext: Object,overrideContext: Object) {
        Core.getDefaultObserverLocator()
            .getArrayObserver(this.itemssource)
            .subscribe('clbk', (changes) => {
                this.items.splice(0, this.items.length);
                this.itemssource.forEach(item => 
                    { 
                        alert(this.context);
                        return this.items.push(<ListBoxItem>{datacontext: item, context: this.context});
                    });
            });
    }
}