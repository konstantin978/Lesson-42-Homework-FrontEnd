export interface IStudent{
    id:string;
    name:string;
    surname:string;
};

export interface IState {
    list: IStudent[];
};

export type PartialUser = Omit<IStudent, 'id'>;