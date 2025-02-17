import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TASK, CHECK_TASK, DEL_TASK, INIT_TASKS, EDIT_TASK, Task, TaskContextType } from '../reducers/taskTypes'; // Importa o EDIT_TASK
import { taskReducer } from '../reducers/taskReducer';

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: (todo: Task) => {},
  delTask: (todo: Task) => {},
  checkTask: (todo: Task) => {},
  editTask: (todo: Task) => {}, // Define a função editTask no contexto
});

interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Carregar tarefas salvas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          dispatch({ type: INIT_TASKS, payload: JSON.parse(savedTasks) });
        }
      } catch (error) {
        console.error('Failed to load tasks from storage', error);
      }
    };

    loadTasks();
  }, []);

  // Sincronizar o AsyncStorage sempre que as tarefas forem atualizadas
  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to storage', error);
      }
    };

    if (tasks.length > 0) {
      saveTasksToStorage();
    }
  }, [tasks]);

  // Funções para manipular tarefas
  function addTask(todo: Task) {
    dispatch({ type: ADD_TASK, payload: todo });
  }

  function delTask(todo: Task) {
    dispatch({ type: DEL_TASK, payload: todo.id }); // Passar apenas o id para a ação de deletar
  }

  function checkTask(todo: Task) {
    dispatch({ type: CHECK_TASK, payload: todo.id }); // Passar apenas o id para a ação de verificar
  }

  function editTask(todo: Task) {
    dispatch({ type: EDIT_TASK, payload: todo }); // Despacha a ação de edição
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        delTask,
        checkTask,
        editTask, // Passa a função de editar no contexto
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
