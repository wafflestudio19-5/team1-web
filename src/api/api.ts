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
setHeaderToken(loadToken());

export interface EmptyBody {}

export const ping = () => instance.get("/api/v1/pingpong/");
export const api = {
  // TODO: signin api must return jwt token
  signin: async (email: string, password: string) =>
    (
      await instance.post<EmptyBody>("/api/user/signin/", {
        email: email,
        password: password,
      })
    ).data,
  signup: async (name: string, email: string, password: string) =>
    (
      await instance.post<EmptyBody>("/api/user/signup/", {
        name: name,
        email: email,
        password: password,
      })
    ).data,
  getQuestionList: async () =>
    (await instance.get<QuestionInterface[]>("/api/question/")).data,
  postQuestion: async (title: string, body: string) =>
    (
      await instance.post<QuestionInterface>("/api/question/", {
        title: title,
        body: body,
      })
    ).data,
  getQuestion: async (id: number) =>
    (await instance.get<QuestionInterface>(`/api/question/${id}/`)).data,
  editQuestion: async (id: number, title: string, body: string) =>
    (
      await instance.put<QuestionInterface>(`/api/question/${id}/`, {
        title: title,
        body: body,
      })
    ).data,
  deleteQuestion: async (id: number) =>
    (await instance.delete<EmptyBody>(`/api/question/${id}/`)).data,
  getQuestionCommentList: async (questionId: number) =>
    (await instance.get<Comment[]>(`/api/question/${questionId}/comment/`))
      .data,
  postQuestionComment: async (questionId: number, body: string) =>
    (
      await instance.post<Comment>(`/api/question/${questionId}/comment/`, {
        body: body,
      })
    ).data,
  editQuestionComment: async (
    questionId: number,
    commentId: number,
    body: string
  ) =>
    (
      await instance.put<Comment>(
        `/api/question/${questionId}/comment/${commentId}/`,
        {
          body: body,
        }
      )
    ).data,
  deleteQuestionComment: async (questionId: number, commentId: number) =>
    (
      await instance.delete<EmptyBody>(
        `/api/question/${questionId}/comment/${commentId}/`
      )
    ).data,
  postAnswer: async (questionId: number, title: string, body: string) =>
    (
      await instance.post<Answer>(`/api/question/${questionId}/answer/`, {
        title: title,
        body: body,
      })
    ).data,
  editAnswer: async (answerId: number, title: string, body: string) =>
    (
      await instance.put<Answer>(`/api/answer/${answerId}`, {
        title: title,
        body: body,
      })
    ).data,
  deleteAnswer: async (answerId: number) =>
    (await instance.delete<EmptyBody>(`/api/answer/${answerId}`)).data,

  // TODO: need up/down parameter
  voteUpQuestion: async (questionId: number) =>
    (await instance.post<EmptyBody>(`/api/question/${questionId}/vote/`)).data,
  voteDownQuestion: async (questionId: number) =>
    (await instance.post<EmptyBody>(`/api/question/${questionId}/vote/`)).data,
  voteUpAnswer: async (answerId: number) =>
    (await instance.post(`/api/answer/${answerId}/vote/`)).data,
  voteDownAnswer: async (answerId: number) =>
    (await instance.post(`/api/answer/${answerId}/vote/`)).data,
};
