import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_STOP, DEL_STOP, INIT_STOPS, Stop, StopContextType } from '../reducers/stopTypes';
import { stopReducer } from '../reducers/stopReducer';

export const StopContext = createContext<StopContextType>({
  stops: [],
  addStop: (todo: Stop) => {},
  delStop: (todo: Stop) => {},
});

interface StopContextProviderProps {
  children: ReactNode;
}

export function StopContextProvider({ children }: StopContextProviderProps) {
  const [stops, dispatch] = useReducer(stopReducer, []);

  // Carregar paradas salvas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadStops = async () => {
      try {
        const savedStops = await AsyncStorage.getItem('stops');
        if (savedStops) {
          dispatch({ type: INIT_STOPS, payload: JSON.parse(savedStops) });
        }
      } catch (error) {
        console.error('Failed to load stops from storage', error);
      }
    };

    loadStops();
  }, []);

  // Função para salvar paradas no AsyncStorage
  const saveStopsToStorage = async (newStops: Stop[]) => {
    try {
      await AsyncStorage.setItem('stops', JSON.stringify(newStops));
    } catch (error) {
      console.error('Failed to save stops to storage', error);
    }
  };

  function addStop(todo: Stop) {
    const updatedStops = [...stops, todo];
    dispatch({ type: ADD_STOP, payload: todo });
    saveStopsToStorage(updatedStops); // Salvar as paradas atualizadas
  }

  function delStop(todo: Stop) {
    const updatedStops = stops.filter(t => t.id !== todo.id);
    dispatch({ type: DEL_STOP, payload: todo });
    saveStopsToStorage(updatedStops); // Salvar as paradas atualizadas
  }

  return (
    <StopContext.Provider
      value={{
        stops,
        addStop,
        delStop,
      }}
    >
      {children}
    </StopContext.Provider>
  );
}
