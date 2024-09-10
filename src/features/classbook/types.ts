
export interface IState {
    lessons: ILesson[];
};

export interface ILesson {
    id: string;
    title: string;
    ratings: IRating[];
};

export interface IRating {
    id: string;
    student: string;
    rate: number | string;
};

export type inputLesson = Omit<ILesson, 'id'>;