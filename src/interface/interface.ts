export interface User {
  id: number;
  username: string;
  email: string;
  image: string | null;
  location: string | null;
  userTitle: string | null;
  aboutMe: string | null;
  websiteLink: string | null;
  githubLink: string | null;
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

export interface Comment {
  id: number;
  user: User;
  body: string;
  questionId: number | null;
  answerId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface QuestionComment extends Comment {
  questionId: number;
  answerId: null;
}

export interface AnswerComment extends Comment {
  questionId: null;
  answerId: number;
}

export interface Answer {
  id: number;
  user: User;
  body: string;
  votes: number;
  comments: AnswerComment[];
  accepted: boolean;
  createdAt: string;
  editedAt: string | null;
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
  editedAt: string | null;
}

export interface QuestionListResponse {
  content: QuestionInterface[];
  totalElements: number;
  totalPages: number;
}

export interface UserInfoResponse extends User {
  location: string | null;
  userTitle: string | null;
  aboutMe: string | null;
  websiteLink: string | null;
  githubLink: string | null;
  questions: {
    id: number;
    title: string;
    createdAt: string;
  }[];
  answers: {
    id: number;
    questionTitle: string;
    questionId: number;
    createdAt: string;
  }[];
}

export interface UserSummary {
  id: number;
  username: string;
  // image: string | null;
  location: string | null;
  questionCount: number;
  answerCount: number;
}

export interface UserListResponse {
  content: UserSummary[];
  totalElements: number;
  totalPages: number;
}

export const countVotes = (data: QuestionInterface | Answer) => {
  return "vote" in data ? data.vote : data.votes;
};

export const isAnswered = (question: QuestionInterface) => {
  return question.answers.some((answer) => answer.accepted);
};

export type EditInfo = {
  displayName: string | null;
  location: string | null;
  userTitle: string | null;
  aboutMe: string | null;
  websiteLink: string | null;
  githubLink: string | null;
};

export const customizedImageLink = (image: string | null) => {
  return image ? "https://images.waffleoverflow.shop/" + image : null;
};
