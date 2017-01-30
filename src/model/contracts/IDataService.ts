import { IUser } from './IUser';
import { IDocument } from './IDocument';

export interface IDataService {

    documents: Array<IDocument>;

    users: Array<IUser>;

    fetchUsers(): Promise<any>;
    createUser(user: IUser): Promise<any>;
    updateUser(user: IUser): Promise<any>;
    deleteUser(id: number): Promise<any>;
    

    scanDocument(): Promise<any>;
    // getDocument(id: number);
    // getDocuments(): void;
    createRangeOfDocuments(count: number): Promise<any>;
    createDocument(): Promise<any>;
    deleteDocument(id: number): Promise<any>;
    deleteLastOfDocuments(count:number): Promise<any>;
    // updateDocument(id: number): void;
}
