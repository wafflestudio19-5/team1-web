import React, { FC } from "react";

import MDEditor from "@uiw/react-md-editor";
import styles from "./Markdown.module.scss";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { uriTransformer } from "react-markdown";
import "highlight.js/styles/stackoverflow-light.css";

interface MarkdownEditorProps {
  value: string | undefined;
  onChange: (state: string | undefined) => void;
  className?: string;
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
      <MarkdownViewer source={value} />
    </div>
  );
};

const myUriTransformer = (url: string) => {
  const transformed = uriTransformer(url);
  const protocols = ["http", "https", "mailto", "tel"];
  return transformed === "" ||
    protocols.some((protocol) => transformed.startsWith(protocol))
    ? transformed
    : "https://" + transformed;
};

export const MarkdownViewer: FC<MarkdownViewerProps> = ({
  className,
  source,
}) => {
  return (
    <MDEditor.Markdown
      className={className}
      source={source}
      rehypePlugins={[[rehypeSanitize], [rehypeHighlight]]}
      transformLinkUri={myUriTransformer}
      transformImageUri={myUriTransformer}
    />
  );
};

export const MarkdownCommentEditor: React.FC<MarkdownEditorProps> = ({
  className,
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <MDEditor
        className={`${className} ${styles.editor}`}
        height={80}
        preview={"edit"}
        hideToolbar={true}
        extraCommands={[]}
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
};
