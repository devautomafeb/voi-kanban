import { ADD_TASK, DEL_TASK, CHECK_TASK, INIT_TASKS,EDIT_TASK, Task } from './taskTypes';

export const CHECK_RECURRING_TASK = 'CHECK_RECURRING_TASK';


type TaskAction = 
  | { type: typeof ADD_TASK; payload: Task }
  | { type: typeof DEL_TASK; payload: number }
  | { type: typeof CHECK_TASK; payload: number }
  | { type: typeof EDIT_TASK; payload: Task } // Ação de edição de tarefa
  | { type: typeof CHECK_RECURRING_TASK }  // Ação para recriação
  | { type: typeof INIT_TASKS; payload: Task[] }

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];

    case DEL_TASK:
      return state.filter(task => task.id !== action.payload);

    case CHECK_TASK:
      const updatedTasks = state.map(task => {
        if (task.id === action.payload) {
          const isCompleted = !task.task.completed;

          // Atualiza a data de conclusão
          const updatedTask: Task = {
            ...task,
            task: {
              ...task.task,
              completed: isCompleted,
              date: isCompleted ? new Date() : task.task.date,  // Atualiza a data se for concluída
            }
          };

          // Se a tarefa for recorrente e está sendo marcada como concluída
          if (task.task.recurring && isCompleted) {
            const newDate = new Date();
            newDate.setDate(
              updatedTask.task.date.getDate() + (task.task.recurringInterval || 1)  // Adiciona o intervalo de recorrência
            );

            // Cria uma nova tarefa recorrente para o próximo intervalo
            const newTask: Task = {
              id: Math.round(100000 * Math.random()), // Novo ID
              task: {
                ...updatedTask.task,
                date: newDate, // Define a nova data
                completed: false // Reseta o status de conclusão
              }
            };

            return [updatedTask, newTask];
          }

          return updatedTask;
        }

        return task;
      }).flat();

      return sortTasksByCompletion(updatedTasks);

    case CHECK_RECURRING_TASK:
      // Lógica para recriação de tarefas recorrentes
      const newTasks = state.map(task => {
        if (task.task.recurring && task.task.completed) {
          const newDate = new Date();
          newDate.setDate(task.task.date.getDate() + 1);  // Adiciona um dia à data atual

          return {
            ...task,
            id: Math.round(100000 * Math.random()), // Novo ID
            task: { ...task.task, date: newDate, completed: false },  // Atualiza a data e reseta o status
          };
        }
        return task;
      });
      return sortTasksByCompletion([...state, ...newTasks]);

    case EDIT_TASK:
      // Atualiza a tarefa com base no ID
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, task: { ...action.payload.task } } // Atualiza a tarefa com os novos dados
          : task
      );

    case INIT_TASKS:
      return sortTasksByCompletion(action.payload);

    default:
      return state;
  }
};

// Função auxiliar para ordenar as tasks, movendo as concluídas para o final
const sortTasksByCompletion = (tasks: Task[]): Task[] => {
  return tasks.sort((a, b) => Number(a.task.completed) - Number(b.task.completed));
};
