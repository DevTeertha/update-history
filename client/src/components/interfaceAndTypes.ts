export interface infoDataI {
  id?: string;
  name?: string;
  city?: string;
  description?: string;
  lat?: string;
  lon?: string;
}
export interface infoI {
  status: boolean;
  message: string;
  data: infoDataI[];
}
export type modalProps = {
    style?: any,
    editOpen?: boolean,
    handleEditClose?: () => void
}
export type infoDataProps = {
    row: infoDataI;
    editOpen: boolean;
    style: any;
    handleEditOpen: ()=>void;
    handleEditClose: ()=>void;
}