import React, { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import styles from "./Markdown.module.scss";

const markdown = `
# 헤딩

**굵게**

일반 텍스트

\`\`\`
코드블럭
\`\`\`

*기울이기*

글자\`배경색\`

> 인용문
`;
interface MarkdownProps {
  state?: string | undefined;
  setState?: (state: string | undefined) => void;
}

const Markdown: React.FC<MarkdownProps> = ({ state, setState }) => {
  // const [state, setState] = useState<string | undefined>(markdown);

  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        height={300}
        preview={"edit"}
        extraCommands={[]}
        value={state}
        onChange={setState}
      />
      <MDEditor.Markdown source={state} />
    </div>
  );
};

export default Markdown;
