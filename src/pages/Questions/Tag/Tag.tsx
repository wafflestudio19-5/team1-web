import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Tag.module.scss";

interface TagProps {
  tag: string;
}

export const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <div className={styles.tag}>
      <Link to={`/questions/tagged/${tag}`}>{tag}</Link>
    </div>
  );
};
