import React, { useRef, useState } from "react";

import styles from "./ImageInputBox.module.scss";

type ImageInputBoxProps = {
  state: File | null;
  setState(e: File | null): void;
  closeBox(): void;
};

const ImageInputBox: React.FC<ImageInputBoxProps> = ({
  state,
  setState,
  closeBox,
}) => {
  const [imgSrc, setImgSrc] = useState<string>("/logo.png");

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (event?.target.files.length) {
      const imgTarget = event.target.files[0];
      setState(event.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        if (e.target) {
          setImgSrc(String(e.target.result));
        }
      };
    } else {
      setImgSrc("/logo.png");
    }
  };

  return (
    <div className={styles.imageInputBox}>
      <span className={styles.close} onClick={closeBox}>
        X
      </span>
      <img className={styles.previewImg} src={imgSrc} alt={"preview_Img"} />
      <input
        className={styles.imgInput}
        onChange={onChangeHandle}
        type={"file"}
      />
    </div>
  );
};

export default ImageInputBox;
