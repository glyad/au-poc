import { User } from './User';
import { IUser } from './../contracts/IUser';
import { Document } from '.';
import { IDocument, IDataService } from './../contracts';
import { singleton } from 'aurelia-framework';

export class DataService implements IDataService {
    
    private readonly _documents: Array<IDocument> = [];
    private readonly _users: Array<IUser> = [];

    public get users(): Array<IUser> {
        return this._users;
    }

    fetchUsers(): Promise<any> {
        return new Promise(resolve => {
            this._users.splice(0, this._users.length);

            this._users.push(<IUser>{id: 0, firstName: 'John', lastName: 'Smith'});
            this._users.push(<IUser>{id: 1, firstName: 'David', lastName: 'LogoUI'});
        });
    }

    createUser(user: IUser): Promise<any> {
        return new Promise(resolve => {
            this._users.push(user);
        });
    }

    updateUser(user: IUser): Promise<any> {
        return new Promise(resolve => {
            Object.assign(this._users.find( u => u.id === user.id), user);
        });
    }

    deleteUser(id: number): Promise<any> {
        return new Promise(resolve => {});
    }


    //////////////////////

    imagePath : string = '../../assets/3.png';

    document: IDocument = new Document();

    constructor () {

        console.log('DataService.ctr');

		for (let i = 0; i < 10; i++) {
			this._documents
            	.push (	<IDocument> { 
                          name: 'Document ' + i.toString()
                		, id: i
                        , description: 'This is description of the Document #' + i.toString()
                        , caseId: 'Case #' + i.toString() } );
        }

    }

    get documents(): Array<IDocument> {
        return this._documents;
    }

    createDocument(): Promise<any> {        
        return new Promise(resolve => setTimeout(() => {
            let lastIndex: number = this._documents.length - 1;
            let id: number = this._documents.length > 0 ? this._documents[lastIndex].id : -1;
            id += 1;

            this._documents.push( <IDocument>{ 
                          name: 'Document ' + id.toString()
                		, id: id
                        , description: 'This is description of the Document #' + id.toString()
                        , caseId: 'Case #' + id.toString() } );   

            resolve();                                 
        }, 1));
    }

    createRangeOfDocuments(count: number): Promise<any> {
        return new Promise<any>(resolve => {
            try {

                    let lastIndex: number = this._documents.length - 1;
                    let id: number = this._documents[lastIndex] === undefined ? -1 : this._documents[lastIndex].id;
                    
                    //let tempArray: Array<IDocument> = [];
        
                    for(let i: number = 0; i < count; i++) {
                        ++id;
                        this._documents.push( <IDocument>{ 
                                 name: 'Document ' + id.toString()
                        		, id: id
                                , description: 'This is description of the Document #' + id.toString()
                                , caseId: 'Case #' + id.toString() } );   
                    }
        
                    // Kills observation!                    
                    //this._documents = this._documents.concat(tempArray);

                    resolve(this._documents);
                    
            } catch (error) {
                throw error;
            }
            
        });
    }

    deleteDocument(id: number): Promise<any> {
        return new Promise(resolve => setTimeout(() => {
            let candidate = this._documents.find((item) => item.id == id);
            if (candidate === undefined)
                throw new Error('The item is not found.');

            let index = this._documents.indexOf(candidate, 0);
            if (index > -1) {
               this._documents.splice(index, 1);
            }

            resolve();
        }, 300));
    }

    deleteLastOfDocuments(count: number): Promise<any> {
        return new Promise(resolve => setTimeout(() => {
            let startIndexToDelete: number = this._documents.length - count; 
            this._documents.splice(startIndexToDelete, count);                
        }, 300));
    }

    UpdateDocumentData( name: string, 
                        id: number,
                        description: string,
                        caseId: string): Promise<any> {

        
        return new Promise(resolve => setTimeout(() => {
            this.document = <IDocument> { name: name, id: id, description: description, caseId: caseId};
            resolve();
        }, 1000));
    }

    UpdateImage(id: number): Promise<any> {
        return new Promise(resolve => setTimeout(() => {
            this.imagePath = "../../assets/" + id.toString() + ".png";
            console.log(this.imagePath);
            resolve();
        }, 1000));
    }

    scanDocument(): Promise<any> {
        return new Promise (async resolve => {
            console.log('scanDocument is called: ');
            await this.UpdateDocumentData("Petya", 2, "Alkash", "12-3-45");
            await this.UpdateImage(1);
            await this.UpdateImage(2);
            await this.UpdateImage(3);          

            resolve();
        })
    }
}
