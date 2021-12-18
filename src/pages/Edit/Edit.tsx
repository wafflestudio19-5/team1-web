import React, { useState, useEffect, ChangeEvent } from "react";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";

import styles from "./Ask.module.scss";

interface EditProps {
  title?: string;
  body: string;
  isQuestion: boolean;
}

const Ask: React.FC<EditProps> = ({ title, body, isQuestion }) => {
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedBody, setEditedBody] = useState<string | undefined>("");
  //   const [editedTags, setEditedTags] = useState<Array<string>>([]);

  useEffect(() => {
    setEditedTitle(title ? title : "");
    setEditedBody(body ? body : "");
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div className={styles.ask}>
      <div className={styles.content}>
        <div className={styles.title}>
          <label>Title</label>
          <input
            maxLength={300}
            value={editedTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.body}>
          <label>Body</label>
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
      <div className={styles.postButton}>
        <BlueButton text={"Post your question"} />
      </div>
    </div>
  );
};

export default Ask;
