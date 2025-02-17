import { Goal } from "./goalTypes";

// Constantes para as ações
export const ADD_TASK = 'ADD_TASK';
export const DEL_TASK = 'DEL_TASK';
export const CHECK_TASK = 'CHECK_TASK';
export const INIT_TASKS = 'INIT_TASKS';  // Inicializar tarefas, caso necessário
export const EDIT_TASK = 'EDIT_TASK';  

// Definição do tipo taskData
export type taskData = {
    description: string;
    completed?: boolean;
    date: Date;
    relatedProject?: string; // Adiciona a relação com o projeto à taskData
    recurring: boolean;       // Campo que indica se a tarefa é recorrente
    recurringInterval?: number; // Intervalo de recorrência (em dias), opcional
};

// Definição do tipo Task
export type Task = {
    id: number;
    task: taskData;
    relatedGoal?: Goal;       // Relacionamento com uma meta (opcional)
    relatedProject?: string;  // Relacionamento com um projeto (opcional)
}

// Definição do tipo TaskContextType para o contexto das tarefas
export type TaskContextType = {
    tasks: Task[];  // Array de tarefas
    addTask: (todo: Task) => void;   // Função para adicionar uma tarefa
    delTask: (todo: Task) => void;   // Função para deletar uma tarefa
    checkTask: (todo: Task) => void; // Função para marcar/desmarcar como completa
    editTask: (todo: Task) => void; // Função para marcar/desmarcar como completa
}
