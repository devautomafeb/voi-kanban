import { ADD_STOP, DEL_STOP, INIT_STOPS, Stop } from './stopTypes';

type Action = 
  | { type: typeof ADD_STOP; payload: Stop }
  | { type: typeof DEL_STOP; payload: { id: number } }
  | { type: typeof INIT_STOPS; payload: Stop[] };

export const stopReducer = (state: Stop[], action: Action): Stop[] => {
  switch (action.type) {
    case ADD_STOP:
      return [...state, action.payload];

    case DEL_STOP:
      return state.filter(item => item.id !== action.payload.id);

    case INIT_STOPS:
      return action.payload; // Inicializa as paradas do AsyncStorage

    default:
      return state;
  }
};
