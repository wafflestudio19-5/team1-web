import React, { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import { MarkdownEditor } from "../../Components/Markdown/Markdown";

import { api } from "../../api/api";

import styles from "./Ask.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useSessionContext } from "../../contexts/SessionContext";
import { removeSpace } from "../../hooks/hooks";

const Ask: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useSessionContext();
  const [submit, setSubmit] = useState<boolean>(false);
  const [values, setValues] = useState<{
    title: string;
    body: string | undefined;
  }>({ title: "", body: "" });

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
        if (
          removeSpace(values.title).length < 5 &&
          removeSpace(values.body).length > 1
        ) {
          return;
        } else {
          const question = await api.postQuestion(values.title, values.body);
          toast.success("Question created!");
          navigate(`/questions/${question.id}`);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.error("Invalid parameter!");
            } else if (err.response.status === 401) {
              toast.error("Please sign in first!");
              navigate("/login");
            } else toast.error(`Unexpected error: ${err.response.status}`);
          } else toast.error("Cannot connect to server");
        } else console.error(err);
      }
    }
  };

  useEffect(() => {
    if (userInfo === null) {
      toast.error("Please sign in to ask a question!");
    }
  }, [navigate, userInfo]);

  return userInfo === null ? (
    <Navigate to={"/login"} replace />
  ) : (
    <div className={styles.ask}>
      <div className={styles.header}>
        <h1>Ask a public question</h1>
      </div>

      <form className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <label>Title</label>
          <p className={styles.tip}>
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            name="title"
            value={values.title}
            maxLength={300}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            onChange={handleTitleChange}
          />
          {submit && removeSpace(values.title).length < 5 ? (
            <p className={styles.errorMessage}>
              {"Title must be at least 5 characters without space."}
            </p>
          ) : null}
        </div>

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

        <div className={styles.postButton}>
          <BlueButton
            type="submit"
            text={"Post your question"}
            onClick={() => setSubmit(true)}
          />
        </div>
      </form>
    </div>
  );
};

export default Ask;
