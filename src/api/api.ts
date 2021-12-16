import axios from "axios";
import { Answer, Comment, QuestionInterface } from "../interface/interface";

const API_ENDPOINT = "https://waffleoverflow.shop/";

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

const setHeaderToken = (newToken: string | null) => {
  if (newToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};
const ACCESS_TOKEN_KEY = "accessToken";
const loadToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const storeToken = (newToken: string | null) => {
  if (newToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const setAccessToken = (token: string | null) => {
  setHeaderToken(token);
  storeToken(token);
};
export const getAccessToken = () => loadToken();

export interface EmptyBody {}

export const ping = () => instance.get("/api/v1/pingpong/");
export const api = {
  // TODO: signin api must return jwt token
  signin: (email: string, password: string) =>
    instance.post<EmptyBody>("/api/user/signin/", {
      email: email,
      password: password,
    }),
  signup: (name: string, email: string, password: string) =>
    instance.post<EmptyBody>("/api/user/signup/", {
      name: name,
      email: email,
      password: password,
    }),
  getQuestionList: () => instance.get<QuestionInterface[]>("/api/question/"),
  postQuestion: (title: string, body: string) =>
    instance.post<QuestionInterface>("/api/question/", {
      title: title,
      body: body,
    }),
  getQuestion: (id: number) =>
    instance.get<QuestionInterface>(`/api/question/${id}/`),
  editQuestion: (id: number, title: string, body: string) =>
    instance.put<QuestionInterface>(`/api/question/${id}/`, {
      title: title,
      body: body,
    }),
  deleteQuestion: (id: number) =>
    instance.delete<EmptyBody>(`/api/question/${id}/`),
  getQuestionCommentList: (questionId: number) =>
    instance.get<Comment[]>(`/api/question/${questionId}/comment/`),
  postQuestionComment: (questionId: number, body: string) =>
    instance.post<Comment>(`/api/question/${questionId}/comment/`, {
      body: body,
    }),
  editQuestionComment: (questionId: number, commentId: number, body: string) =>
    instance.put<Comment>(`/api/question/${questionId}/comment/${commentId}/`, {
      body: body,
    }),
  deleteQuestionComment: (questionId: number, commentId: number) =>
    instance.delete<EmptyBody>(
      `/api/question/${questionId}/comment/${commentId}/`
    ),
  postAnswer: (questionId: number, title: string, body: string) =>
    instance.post<Answer>(`/api/question/${questionId}/answer/`, {
      title: title,
      body: body,
    }),
  editAnswer: (answerId: number, title: string, body: string) =>
    instance.put<Answer>(`/api/answer/${answerId}`, {
      title: title,
      body: body,
    }),
  deleteAnswer: (answerId: number) =>
    instance.delete<EmptyBody>(`/api/answer/${answerId}`),

  // TODO: need up/down parameter
  voteUpQuestion: (questionId: number) =>
    instance.post<EmptyBody>(`/api/question/${questionId}/vote/`),
  voteDownQuestion: (questionId: number) =>
    instance.post<EmptyBody>(`/api/question/${questionId}/vote/`),
  voteUpAnswer: (answerId: number) =>
    instance.post(`/api/answer/${answerId}/vote/`),
  voteDownAnswer: (answerId: number) =>
    instance.post(`/api/answer/${answerId}/vote/`),
};
