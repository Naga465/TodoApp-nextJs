import { RouteComponentProps } from 'react-router'


export type NoteInfo =  {
    title:string,
    description:string
    timeStamp:Date
}
export interface Note extends NoteInfo {
    id:number,
}

export type AddNoteProps = {
    initTitle?: string;
    initDescription?: string;
    initEditMode?:boolean
    onSave?: (body: NoteInfo) => Promise<void>;
    editNote?: (body: NoteInfo, id: number) => Promise<void>;
    onClose?: Function;
    id?: number | null;
}
export interface ViewNotesProps extends RouteComponentProps {
    notes:Note[]
}
