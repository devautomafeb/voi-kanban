export const ADD_GOAL = 'ADD_GOAL';
export const DEL_GOAL = 'DEL_GOAL';
export const CHECK_GOAL = 'CHECK_GOAL';
export const INIT_GOALS = 'INIT_GOALS';  // Ação para inicializar as metas do AsyncStorage
export const EDIT_GOAL = 'EDIT_GOAL';    // Ação para editar metas

export type projectData = {
  name: string;
  description: string;
}

export type Goal = {
  id: number;
  project: projectData;
  importance: string;
  startDate: Date;
  endDate: Date;
  completed?: boolean;
}

// goalTypes.ts
export interface GoalContextType {
  goals: Goal[];
  addGoals: (goal: Goal) => void;
  delGoals: (goal: Goal) => void;
  checkGoals: (goal: Goal) => void;
  editGoals: (goal: Goal) => void; // Adicione esta linha
}


// Definir o tipo Action
export type Action =
  | { type: typeof ADD_GOAL, payload: Goal }
  | { type: typeof DEL_GOAL, payload: Goal }
  | { type: typeof CHECK_GOAL, payload: Goal }
  | { type: typeof INIT_GOALS, payload: Goal[] }
  | { type: typeof EDIT_GOAL, payload: Goal };  // Adicione este tipo para editar metas
