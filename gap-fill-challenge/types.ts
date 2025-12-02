export interface AnswerKey {
  [key: number]: string;
}

export interface TextSegment {
  text: string;
  blankNumber?: number; // If present, this segment ends with a blank input
}

export enum InputStatus {
  IDLE = 'IDLE',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}
