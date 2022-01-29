import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./TagItem.module.scss";

interface TagProps {
  tag: string;
}

const TagItem: FC<TagProps> = ({ tag }) => {
  return (
    <div className={styles.tag}>
      <Link to={`/questions/tagged/${tag}`}>{tag}</Link>
    </div>
  );
};

export default TagItem;
