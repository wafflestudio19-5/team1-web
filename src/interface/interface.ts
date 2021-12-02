export interface User {
  id: number;
  name: string;
  profile: string;
}

export interface Tag {
  id: number;
  name: string;
  intro: string;
}

export interface Vote {
  id: number;
  user: User;
  status: string;
  questionId: number;
  answerId: number;
}

export interface Comment {
  id: number;
  user: User;
  body: string;
  questionId: number;
  answerId: number;
}

export interface Answer {
  id: number;
  user: User;
  body: string;
  votes: number;
  comments: Comment[];
  accpedted: boolean;
}

export interface QuestionInterface {
  id: number;
  user: User;
  title: string;
  body: string;
  votes: number;
  comments: Comment[];
  tags: Tag[];
  answers: Answer[];
  createdAt: string;
}
