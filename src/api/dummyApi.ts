import {
  Answer,
  QuestionComment,
  QuestionInterface,
  User,
} from "../interface/interface";

interface UserData {
  id: number;
  name: string;
  email: string;
  profile: string;
  password: string;
}
let currentUser: User | null = null;

function box<T>(e: T | undefined) {
  return e ? [e] : [];
}
function unbox<T>(l: T[]) {
  return l.length ? l[0] : undefined;
}

export type AccessToken = User;

// used only in SessionContext.tsx
export const _setCurrentUser = (token: AccessToken | null) => {
  currentUser = token;
};
// used only in SessionContext.tsx
export const _getCurrentUser = () => currentUser;

const dummyUsers: UserData[] = [
  {
    id: 0,
    name: "alice",
    email: "alice@example.com",
    profile: "",
    password: "password",
  },
  {
    id: 1,
    name: "bob",
    email: "bob@example.com",
    profile: "",
    password: "baseball",
  },
];
const dummyQuestions: QuestionInterface[] = [
  {
    id: 101,
    title: "Lorem Ipsum",
    votes: [],
    tags: [],
    user: {
      id: 0,
      profile: "",
      name: "alice",
      email: "alice@example.com",
    },
    answers: [
      {
        id: 301,
        user: {
          id: 1,
          name: "bob",
          email: "bob@example.com",
          profile: "",
        },
        body: "yes",
        title: "no?",
        votes: [
          {
            id: 501,
            user: {
              id: 0,
              profile: "",
              name: "alice",
              email: "alice@example.com",
            },
            status: -1,
            articleId: 301,
          },
        ],
        comments: [
          {
            id: 201,
            user: {
              id: 0,
              profile: "",
              name: "alice",
              email: "alice@example.com",
            },
            body: "no!",
            answerId: 301,
          },
        ],
        accepted: false,
      },
    ],
    createdAt: new Date(2021, 12, 1).toISOString(),
    comments: [
      {
        id: 201,
        user: {
          id: 1,
          name: "bob",
          email: "bob@example.com",
          profile: "",
        },
        body: "hello world!",
        questionId: 101,
      },
    ],
    body: "lorem ipsum foo bar baz",
  },
];
let lastId = 1000;

export class DummyApiError extends Error {
  public statusCode: number;
  constructor(code: number, msg: string) {
    super(msg);
    this.statusCode = code;
    Object.setPrototypeOf(this, DummyApiError.prototype);
  }
}

export const dummyApi = {
  ping: async () => "pingpong",

  // returns jwt token
  signin: async (email: string, password: string): Promise<AccessToken> => {
    const userData = dummyUsers.find((user) => user.email === email);
    if (!userData || userData.password !== password)
      throw new DummyApiError(401, "Unauthorized");
    const { password: _, ...user } = userData;
    return user;
  },
  signup: async (
    name: string,
    email: string,
    password: string
  ): Promise<AccessToken> => {
    const already = dummyUsers.find((user) => user.email === email);
    if (already) throw new DummyApiError(400, "user already exists");
    const userData: UserData = {
      email: email,
      id: ++lastId,
      name: name,
      password: password,
      profile: "",
    };
    dummyUsers.push(userData);
    const { password: _, ...user } = userData;
    return user;
  },
  getQuestionList: async () => dummyQuestions,
  postQuestion: async (title: string, body: string) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const question: QuestionInterface = {
      id: ++lastId,
      user: currentUser,
      title: title,
      body: body,
      votes: [],
      comments: [],
      tags: [],
      answers: [],
      createdAt: new Date().toISOString(),
    };
    dummyQuestions.push(question);
    return question;
  },
  getQuestion: async (id: number) => {
    const question = dummyQuestions.find((value) => value.id === id);
    if (!question) throw new DummyApiError(404, "Not found");
    return question;
  },
  editQuestion: async (id: number, title: string, body: string) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const item = dummyQuestions.find((value) => value.id === id);
    if (!item) throw new DummyApiError(404, "Not found");
    if (item.user.id !== currentUser.id)
      throw new DummyApiError(401, "Unauthorized");
    item.title = title;
    item.body = body;
    return item;
  },
  deleteQuestion: async (id: number) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const index = dummyQuestions.findIndex((value) => value.id === id);
    if (index < 0) throw new DummyApiError(404, "Not found");
    if (dummyQuestions[index].user.id !== currentUser.id)
      throw new DummyApiError(401, "Unauthorized");
    dummyQuestions.splice(index, 1);
    return {};
  },
  getQuestionCommentList: async (questionId: number) => {
    const item = dummyQuestions.find((value) => value.id === questionId);
    if (!item) throw new DummyApiError(404, "Not found");
    return item.comments;
  },
  postQuestionComment: async (questionId: number, body: string) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const item = dummyQuestions.find((value) => value.id === questionId);
    if (!item) throw new DummyApiError(404, "Not found");
    const comment: QuestionComment = {
      body: body,
      id: ++lastId,
      questionId: questionId,
      user: currentUser,
    };
    item.comments.push(comment);
    return {};
  },
  editQuestionComment: async (
    questionId: number,
    commentId: number,
    body: string
  ) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const question = dummyQuestions.find((value) => value.id === questionId);
    if (!question) throw new DummyApiError(404, "Not found");
    const comment = question.comments.find((value) => value.id === commentId);
    if (!comment) throw new DummyApiError(404, "Not found");
    if (comment.user.id !== currentUser.id)
      throw new DummyApiError(401, "Unauthorized");
    comment.body = body;
    return comment;
  },
  deleteQuestionComment: async (questionId: number, commentId: number) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const question = dummyQuestions.find((value) => value.id === questionId);
    if (!question) throw new DummyApiError(404, "Not found");
    const index = question.comments.findIndex(
      (value) => value.id === commentId
    );
    if (index < 0) throw new DummyApiError(404, "Not found");
    if (question.comments[index].user.id !== currentUser.id)
      throw new DummyApiError(401, "Unauthorized");
    question.comments.splice(index, 1);
    return {};
  },
  postAnswer: async (questionId: number, title: string, body: string) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const question = dummyQuestions.find((value) => value.id === questionId);
    if (!question) throw new DummyApiError(404, "Not found");
    const answer: Answer = {
      accepted: false,
      title: title,
      body: body,
      comments: [],
      id: ++lastId,
      user: currentUser,
      votes: [],
    };
    question.answers.push(answer);
    return answer;
  },
  editAnswer: async (answerId: number, title: string, body: string) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const answer = unbox(
      dummyQuestions.flatMap((question) =>
        box(question.answers.find((answer) => answer.id === answerId))
      )
    );
    if (!answer) throw new DummyApiError(404, "Not found");
    if (answer.user.id !== currentUser.id)
      throw new DummyApiError(401, "Unauthorized");
    answer.title = title;
    answer.body = body;
    return answer;
  },
  deleteAnswer: async (answerId: number) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    for (const question of dummyQuestions) {
      for (let i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        if (answer.id === answerId) {
          if (answer.user.id !== currentUser.id)
            throw new DummyApiError(401, "Unauthorized");
          question.answers.splice(i, 1);
          return {};
        }
      }
    }
    throw new DummyApiError(404, "Not found");
  },

  voteQuestion: async (questionId: number, vote: -1 | 1) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const question = dummyQuestions.find((value) => value.id === questionId);
    if (!question) throw new DummyApiError(404, "Not found");
    question.votes.push({
      articleId: questionId,
      id: ++lastId,
      status: vote,
      user: currentUser,
    });
    return {};
  },
  voteAnswer: async (answerId: number, vote: -1 | 1) => {
    if (currentUser === null) throw new DummyApiError(401, "Unauthorized");
    const answer = unbox(
      dummyQuestions.flatMap((question) =>
        box(question.answers.find((answer) => answer.id === answerId))
      )
    );
    if (!answer) throw new DummyApiError(404, "Not found");
    answer.votes.push({
      articleId: answerId,
      id: ++lastId,
      status: vote,
      user: currentUser,
    });
  },
};
