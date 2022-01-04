import React from "react";

import MDEditor from "@uiw/react-md-editor";

import styles from "./Markdown.module.scss";

interface MarkdownProps {
  value: string | undefined;
  onChange: (state: string | undefined) => void;
}

const Markdown: React.FC<MarkdownProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        height={300}
        preview={"edit"}
        extraCommands={[]}
        value={value}
        onChange={onChange}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default Markdown;
