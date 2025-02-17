
export const ADD_STOP = 'ADD_STOP';
export const DEL_STOP = 'DEL_STOP';
export const INIT_STOPS = 'INIT_STOPS'; 

export type stopData = {
  name: string,
  description: string
}

export type Stop = {
    id: number;
    stop: stopData;
  }
  
  export type StopContextType = {
    stops: Stop[];
    addStop: (todo: Stop) => void;
    delStop: (todo: Stop) => void
  }