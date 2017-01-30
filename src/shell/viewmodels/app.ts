import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';


export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: '../../home/viewmodels/homeViewModel',      nav: true, 		title: 'Home' }      
    , { route: 'users', name: 'users',      moduleId: '../../users/viewmodels/usersRootViewModel',      nav: true, 		title: 'Users' }      
    , { route: 'contacts', name: 'contacts',      moduleId: '../../contacts/viewmodels/rootViewModel',      nav: true, 		title: 'Contacts' }      
    ]); 

    

    this.router = router;
  }
}
