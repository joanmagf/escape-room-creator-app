// types/Room.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  htmlContent?: string;
  isActive?: boolean;
  entities: Entity[];
  interactions?: Interaction[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Entity {
  id: string;
  roomId: string;
  name: string;
  type: string; // box, sphere, cylinder, etc.
  position: string; // "x y z"
  rotation?: string; // "x y z"
  scale?: string; // "x y z"
  color?: string;
  material?: string;
  visible: boolean;
  properties?: any; // Propietats addicionals
  interactions?: Interaction[];
}

export interface Interaction {
  id: string;
  roomId: string;
  entityId?: string;
  type: string; // question, info, unlock, animation, etc.
  trigger: string; // click, proximity, timer, etc.
  question?: string;
  answer?: string;
  feedback?: string;
  unlocks?: string; // ID de l'entitat que es desbloqueja
  animation?: any; // Configuració d'animació
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  progress?: UserProgress[];
}

export interface UserProgress {
  id: string;
  userId: string;
  roomId: string;
  completed: boolean;
  score?: number;
  timeSpent?: number; // en segons
  completedAt?: Date;
}

// types/Object3D.ts
export interface Object3D {
  name: string;
  component: string;
  properties: Record<string, string>;
}
