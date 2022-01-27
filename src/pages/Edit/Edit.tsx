import React, { useState, useEffect } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import { MarkdownEditor } from "../../Components/Markdown/Markdown";
import { removeSpace } from "../../hooks/hooks";

import { api } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [submit, setSubmit] = useState<boolean>(false);
  const [values, setValues] = useState<{
    title: string;
    body: string | undefined;
  }>({ title: "", body: "" });

  useEffect(() => {
    setValues(location.state);
    // setOrgValues(location.state);
  }, [location.state]);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleBodyChange = (value: string | undefined) => {
    setValues({ ...values, body: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (values.body) {
      if (removeSpace(values.body).length < 1) {
        return;
      }
      try {
        // const editedTitle =
        //   values.title === orgValues.title ? "" : values.title;
        // const editedBody = values.body === orgValues.body ? "" : values.body;
        if (Number(questionId) === Number(id)) {
          if (
            removeSpace(values.title).length < 5 &&
            removeSpace(values.body).length > 1
          ) {
            return;
          } else {
            await api.editQuestion(Number(id), values.title, values.body);
            toast.success("Question edited!");
            navigate(`/questions/${questionId}`);
          }
        } else {
          const answer = await api.editAnswer(Number(id), values.body);
          toast.success("Answer edited!");
          navigate(`/questions/${questionId}#answer-${answer.id}`);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.error("Invalid question id, title or body");
              console.error(err.response.data);
            } else if (err.response.status === 401) {
              toast.error("Please sign in first");
            } else if (err.response.status === 404) {
              toast.error("The question does not exist");
            } else toast.error("Unexpected error: " + err.response.status);
          } else toast.error("Cannot connect to server");
        } else console.error(err);
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
            {submit && removeSpace(values.title).length < 5 ? (
              <p className={styles.errorMessage}>
                {"Title must be at least 5 characters without space."}
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
          <MarkdownEditor value={values.body} onChange={handleBodyChange} />
          {submit && !removeSpace(values.body || "") ? (
            <p className={styles.errorMessage}>{"Body is missing."}</p>
          ) : null}
        </div>
        {/* <div className={styles.tags}>
          <label>Tags</label>
          <p className={styles.tip}>
            Add up to 5 tags to describe what your question is about
          </p>
          <input
            maxLength={300}
            placeholder="e.g. (asp.net-mvc typescript database)"
          />
        </div> */}
        <div className={styles.postButtons}>
          <BlueButton
            type="submit"
            text={"Save edits"}
            onClick={() => setSubmit(true)}
          />
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
