import axios from "axios";
import {
  Answer,
  AnswerComment,
  QuestionComment,
  QuestionInterface,
  UserInfoResponse,
} from "../interface/interface";

const API_ENDPOINT =
  process.env.NODE_ENV === "development" ? "/" : "https://waffleoverflow.shop/";

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

interface SignupResponse extends UserInfoResponse {
  accessToken: string;
}

export type SortCriteria = "id" | "createdAt" | "updatedAt" | "votes";
export type SortOrder = "asc" | "desc";

const setHeaderToken = (newToken: string | null) => {
  if (newToken) {
    instance.defaults.headers.common["Authentication"] = newToken;
  } else {
    delete instance.defaults.headers.common["Authentication"];
  }
};
const ACCESS_TOKEN_KEY = "accessToken";
const loadToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);
const storeToken = (newToken: string | null) => {
  if (newToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export type AccessToken = string;

// used only in SessionContext.tsx
export const _setAccessToken = (token: AccessToken | null) => {
  setHeaderToken(token);
  storeToken(token);
};
// used only in SessionContext.tsx
export const _getAccessToken = () => loadToken();
setHeaderToken(loadToken());

export interface EmptyBody {}

export const api = {
  ping: async () => (await instance.get<string>("/api/ping/")).data,

  _signin: async (email: string, password: string): Promise<AccessToken> => {
    const response = await instance.post<{ accessToken: string }>(
      "/api/user/signin/",
      {
        email: email,
        password: password,
      }
    );
    return response.data.accessToken;
  },
  _signup: async (username: string, email: string, password: string) => {
    const response = await instance.post<SignupResponse>("/api/user/signup/", {
      username: username,
      email: email,
      password: password,
    });
    return {
      token: response.data.accessToken,
      userInfo: response.data,
    };
  },
  _signout: async () => {
    await instance.post<EmptyBody>("/api/user/signout/");
  },
  getMyProfile: async () =>
    (await instance.get<UserInfoResponse>("/api/user/me/")).data,
  getQuestionList: async (
    page = 0,
    sortCriteria: SortCriteria = "id",
    order: SortOrder = "desc"
  ) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("sort", `${sortCriteria},${order}`);
    return (
      await instance.get<{
        content: QuestionInterface[];
        totalElements: number;
        totalPages: number;
      }>("/api/question/?" + params.toString())
    ).data;
  },
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
    (
      await instance.get<QuestionComment[]>(
        `/api/question/${questionId}/comment/`
      )
    ).data,
  postQuestionComment: async (questionId: number, body: string) =>
    (
      await instance.post<QuestionComment>(
        `/api/question/${questionId}/comment/`,
        {
          body: body,
        }
      )
    ).data,
  editQuestionComment: async (commentId: number, body: string) =>
    (
      await instance.put<QuestionComment>(
        `/api/question/comment/${commentId}/`,
        {
          body: body,
        }
      )
    ).data,
  deleteQuestionComment: async (commentId: number) =>
    (await instance.delete<EmptyBody>(`api/question/comment/${commentId}/`))
      .data,
  postAnswer: async (questionId: number, body: string) =>
    (
      await instance.post<Answer>(`/api/question/${questionId}/answer/`, {
        body: body,
      })
    ).data,
  editAnswer: async (answerId: number, body: string) =>
    (
      await instance.put<Answer>(`/api/answer/${answerId}/`, {
        body: body,
      })
    ).data,
  deleteAnswer: async (answerId: number) =>
    (await instance.delete<EmptyBody>(`/api/answer/${answerId}/`)).data,
  getAnswerCommentList: async (answerId: number) =>
    (await instance.get<Answer[]>(`/api/answer/${answerId}/comment/`)).data,
  postAnswerComment: async (answerId: number, body: string) =>
    (
      await instance.post<AnswerComment>(`/api/answer/${answerId}/comment/`, {
        body: body,
      })
    ).data,
  editAnswerComment: async (commentId: number, body: string) =>
    (
      await instance.put<AnswerComment>(`/api/answer/comment/${commentId}/`, {
        body: body,
      })
    ).data,
  deleteAnswerComment: async (commentId: number) =>
    (await instance.delete<EmptyBody>(`/api/answer/comment/${commentId}/`))
      .data,

  voteQuestion: async (questionId: number, vote: -1 | 1) =>
    (
      await instance.post<EmptyBody>(`/api/question/${questionId}/vote/`, {
        status: vote > 0 ? "Up" : "Down",
      })
    ).data,
  voteAnswer: async (answerId: number, vote: -1 | 1) =>
    (
      await instance.post(`/api/answer/${answerId}/vote/`, {
        status: vote > 0 ? "Up" : "Down",
      })
    ).data,
};
