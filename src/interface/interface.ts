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
  title: string;
  body: string;
  votes: Vote[];
  comments: AnswerComment[];
  accepted: boolean;
}

export interface QuestionInterface {
  id: number;
  user: User;
  title: string;
  body: string;
  votes: Vote[];
  comments: QuestionComment[];
  tags: Tag[];
  answers: Answer[];
  createdAt: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  username: string;
  questions: { id: number; title: string }[];
  answers: { id: number; questionTitle: string }[];
}

export const countVotes = (question: QuestionInterface) => {
  return question.votes.length
    ? question.votes.map<number>((vote) => vote.status).reduce((a, b) => a + b)
    : 0;
};

export const isAnswered = (question: QuestionInterface) => {
  return question.answers.some((answer) => answer.accepted);
};
