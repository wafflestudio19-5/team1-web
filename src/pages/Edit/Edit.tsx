import React, { useState, useEffect, ChangeEvent } from "react";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";
import { dummyApi } from "../../api/dummyApi";

import styles from "./Edit.module.scss";
import { useLocation } from "react-router";
import { api } from "../../api/api";

const Edit: React.FC = () => {
  const location = useLocation();
  const { title, body, isQuestion } = location.state;
  const [editedTitle, setEditedTitle] = useState<string | undefined>("");
  const [editedBody, setEditedBody] = useState<string | undefined>("");
  //const [editedTags, setEditedTags] = useState<Array<string>>([]);

  // useEffect(() => {
  //   const doIt = async () => {
  //     try {
  //       const response = await dummyApi.getQuestion(101);
  //       setEditedTitle(response.title);
  //       setEditedBody(response.body);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   doIt().then();
  // }, []);

  useEffect(() => {
    setEditedTitle(title ? title : "");
    setEditedBody(body ? body : "");
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const editAnswer = async () => {
    try {
      await api.editAnswer(1, "", body);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.ask}>
      {isQuestion ? <h1>Ask a public question</h1> : <h1>Answer</h1>}
      <div className={styles.content}>
        {isQuestion && (
          <div className={styles.title}>
            <label>Title</label>
            <p className={styles.tip}>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              maxLength={300}
              value={editedTitle}
              onChange={handleTitleChange}
            />
          </div>
        )}

        <div className={styles.body}>
          <label>Body</label>
          <p className={styles.tip}>
            Include all the information someone would need to answer your
            question
          </p>
          <Markdown state={editedBody} setState={setEditedBody} />
        </div>
        <div className={styles.tags}>
          <label>Tags</label>
          <p className={styles.tip}>
            Add up to 5 tags to describe what your question is about
          </p>
          <input
            maxLength={300}
            placeholder="e.g. (asp.net-mvc typescript database)"
          />
        </div>
      </div>
      <div className={styles.postButtons}>
        <BlueButton text={"Save edits"} />
        <button className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

export default Edit;
