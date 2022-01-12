import React, { FC } from "react";

import MDEditor from "@uiw/react-md-editor";

import styles from "./Markdown.module.scss";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorProps {
  value: string | undefined;
  onChange: (state: string | undefined) => void;
}

interface MarkdownViewerProps {
  className?: string;
  source?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        height={300}
        preview={"edit"}
        extraCommands={[]}
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <MDEditor.Markdown source={value} rehypePlugins={[[rehypeSanitize]]} />
    </div>
  );
};

export const MarkdownViewer: FC<MarkdownViewerProps> = ({
  className,
  source,
}) => {
  return (
    <MDEditor.Markdown
      className={className}
      source={source}
      rehypePlugins={[[rehypeSanitize]]}
    />
  );
};
