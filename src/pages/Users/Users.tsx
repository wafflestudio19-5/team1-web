import React, { useState } from "react";

import User from "./User/User";

import styles from "./Users.module.scss";

const dummy = [
  {
    id: 1,
    username: "userA",
    location: "Korea",
    questionCount: 1,
    answerCount: 0,
  },
  {
    id: 2,
    username: "userB",
    location: "Sophia Antipolis, France",
    questionCount: 1,
    answerCount: 0,
  },
  {
    id: 3,
    username: "userC",
    location: null,
    questionCount: 1,
    answerCount: 0,
  },
  {
    id: 4,
    username: "userD",
    location: null,
    questionCount: 0,
    answerCount: 1,
  },
  {
    id: 5,
    username: "userE",
    location: null,
    questionCount: 0,
    answerCount: 1,
  },
  {
    id: 6,
    username: "userF",
    location: null,
    questionCount: 0,
    answerCount: 1,
  },
  {
    id: 7,
    username: "userG",
    location: null,
    questionCount: 0,
    answerCount: 1,
  },
  {
    id: 8,
    username: "user1",
    location: null,
    questionCount: 0,
    answerCount: 0,
  },
];

interface UserProps {
  id: number;
  username: string;
  location: string | null;
  questionCount: number;
  answerCount: number;
}

const Users = () => {
  const [users, setUsers] = useState<UserProps[]>(dummy);

  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1>{"Users"}</h1>
      </div>
      <div className={styles.cards_container}>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
