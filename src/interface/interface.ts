export interface User {
  id: number;
  name: string;
  email: string;
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
  status: -1 | 1;
  articleId: number;
}

export interface QuestionComment {
  id: number;
  user: User;
  body: string;
  questionId: number;
}

export interface AnswerComment {
  id: number;
  user: User;
  body: string;
  answerId: number;
}

export interface Answer {
  id: number;
  user: User;
  body: string;
  votes: number;
  comments: AnswerComment[];
  accepted: boolean;
  createdAt: Date;
}

export interface QuestionInterface {
  id: number;
  user: User;
  title: string;
  body: string;
  vote: number;
  comments: QuestionComment[];
  tags: Tag[];
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  username: string;
  questions: { id: number; title: string }[];
  answer: { id: number; questionTitle: string }[];
}

export const countVotes = (data: QuestionInterface) => {
  return data.vote;
};

export const isAnswered = (question: QuestionInterface) => {
  return question.answers.some((answer) => answer.accepted);
};
