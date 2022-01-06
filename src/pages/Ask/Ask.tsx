import React from "react";

import { useNavigate } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";

import { useFormik } from "formik";
import * as Yup from "yup";

import { dummyApi } from "../../api/dummyApi";
import { api } from "../../api/api";

import styles from "./Ask.module.scss";

const Ask: React.FC = () => {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: { title: "", body: "" },
      validationSchema: Yup.object({
        title: Yup.string()
          .min(5, "Title must be at least 5 characters.")
          .required("Title is missing"),
        body: Yup.string().required("Body is missing"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values) => {
        try {
          const question = await api.postQuestion(values.title, values.body);
          navigate(`/questions/${question.id}`);
        } catch (err) {
          console.error(err);
        }
      },
    });

  return (
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
            onChange={handleChange}
          />
          {errors.title && values.title.length < 5 ? (
            <p className={styles.errorMessage}>{errors.title}</p>
          ) : null}
        </div>

        <div className={styles.body}>
          <label>Body</label>
          <p className={styles.tip}>
            Include all the information someone would need to answer your
            question
          </p>
          <Markdown
            value={values.body}
            onChange={(e) => setFieldValue("body", e)}
          />
          {errors.body && values.body.length < 5 ? (
            <p className={styles.errorMessage}>{errors.body}</p>
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
          <BlueButton type="submit" text={"Post your question"} />
        </div>
      </form>
    </div>
  );
};

export default Ask;
