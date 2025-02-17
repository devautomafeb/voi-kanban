import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_IDEA, DEL_IDEA, INIT_IDEAS, Idea, IdeaContextType } from '../reducers/ideaTypes';
import { ideaReducer } from '../reducers/ideaReducer';

export const IdeaContext = createContext<IdeaContextType>({
  ideas: [],
  addIdea: (todo: Idea) => {},
  delIdea: (todo: Idea) => {},
});

interface IdeaContextProviderProps {
  children: ReactNode;
}

export function IdeaContextProvider({ children }: IdeaContextProviderProps) {
  const [ideas, dispatch] = useReducer(ideaReducer, []);

  // Carregar ideias salvas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const savedIdeas = await AsyncStorage.getItem('ideas');
        if (savedIdeas) {
          dispatch({ type: INIT_IDEAS, payload: JSON.parse(savedIdeas) });
        }
      } catch (error) {
        console.error('Failed to load ideas from storage', error);
      }
    };

    loadIdeas();
  }, []);

  // Função para salvar ideias no AsyncStorage
  const saveIdeasToStorage = async (newIdeas: Idea[]) => {
    try {
      await AsyncStorage.setItem('ideas', JSON.stringify(newIdeas));
    } catch (error) {
      console.error('Failed to save ideas to storage', error);
    }
  };

  function addIdea(todo: Idea) {
    const updatedIdeas = [...ideas, todo];
    dispatch({ type: ADD_IDEA, payload: todo });
    saveIdeasToStorage(updatedIdeas); // Salvar as ideias atualizadas
  }

  function delIdea(todo: Idea) {
    const updatedIdeas = ideas.filter(t => t.id !== todo.id);
    dispatch({ type: DEL_IDEA, payload: todo });
    saveIdeasToStorage(updatedIdeas); // Salvar as ideias atualizadas
  }

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        addIdea,
        delIdea,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}
