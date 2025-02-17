export const ADD_IDEA = 'ADD_IDEA';
export const DEL_IDEA = 'DEL_IDEA';
export const INIT_IDEAS = 'INIT_IDEAS'; 

export type ideaData = {
  name: string,
  description: string
}

export type Idea = {
  id: number;
  idea: ideaData;
}

export type IdeaContextType = {
  ideas: Idea[];
  addIdea: (idea: Idea) => void;
  delIdea: (idea: Idea) => void;
}
