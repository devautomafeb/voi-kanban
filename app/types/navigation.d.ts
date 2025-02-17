// navigation.d.ts
import { Goal } from './reducers/goalTypes';

export type RootStackParamList = {
  index: undefined; // Rota inicial sem parâmetros
  tasks: undefined;
  stop: undefined;
  ideas: undefined;
  settings: undefined;
  projectDetail: { project: Goal }; // Defina a rota e os parâmetros que ela espera
};
