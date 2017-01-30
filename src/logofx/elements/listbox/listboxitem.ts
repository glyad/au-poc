import { customElement, bindable } from 'aurelia-framework';

@customElement('listbox-item')
export class ListBoxItem {
    @bindable() content: any;
    @bindable() selected: boolean = false;
    @bindable() datacontext: any;
    @bindable() context: any; 

    // bind(bindingContext: Object, overrideContext: Object) {
    //     this.datacontext = overrideContext;
    //     this.content = overrideContext;        
    // }

    contextChanged(newValue){
        alert(newValue);
    } 
    
}
