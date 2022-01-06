import React, { useState, useEffect } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";

import { dummyApi } from "../../api/dummyApi";
import { api } from "../../api/api";

import styles from "./Edit.module.scss";

const Edit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const questionId = location.state.questionId;

  // const [orgValues, setOrgValues] = useState<{
  //   title: string;
  //   body: string | undefined;
  // }>({ title: "", body: "" });
  const [values, setValues] = useState<{
    title: string;
    body: string | undefined;
  }>({ title: "", body: "" });

  useEffect(() => {
    setValues(location.state);
    // setOrgValues(location.state);
  }, []);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleBodyChange = (value: string | undefined) => {
    setValues({ ...values, body: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (values.body) {
      try {
        // const editedTitle =
        //   values.title === orgValues.title ? "" : values.title;
        // const editedBody = values.body === orgValues.body ? "" : values.body;
        if (Number(questionId) === Number(id) && values.title.length > 5) {
          await api.editQuestion(Number(id), values.title, values.body);
        } else {
          await api.editAnswer(Number(id), values.body);
        }
        navigate(`/questions/${questionId}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.ask}>
      {Number(questionId) === Number(id) ? (
        <h1>Ask a public question</h1>
      ) : (
        <h1>Answer</h1>
      )}

      <form className={styles.content} onSubmit={handleSubmit}>
        {Number(questionId) === Number(id) && (
          <div className={styles.title}>
            <label>Title</label>
            <p className={styles.tip}>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              name="title"
              maxLength={300}
              value={values.title}
              onChange={handleTitleChange}
            />
            {values.title.length < 5 ? (
              <p className={styles.errorMessage}>
                {"Title must be at least 5 characters."}
              </p>
            ) : null}
          </div>
        )}

        <div className={styles.body}>
          <label>Body</label>
          <p className={styles.tip}>
            Include all the information someone would need to answer your
            question
          </p>
          <Markdown value={values.body} onChange={handleBodyChange} />
          {!values.body ? (
            <p className={styles.errorMessage}>{"Body is missing."}</p>
          ) : null}
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
        <div className={styles.postButtons}>
          <BlueButton type="submit" text={"Save edits"} />
          <button
            className={styles.cancelButton}
            onClick={() => navigate(`/questions/${questionId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
