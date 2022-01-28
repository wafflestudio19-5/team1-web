import React, { useEffect, useState, useCallback } from "react";

import styles from "./ImageInputBox.module.scss";
import BlueButton from "../BlueButton/BlueButton";
import dummyProfile from "../../icons/dummyProfile.svg";

type ImageInputBoxProps = {
  closeBox(): void;
  submit(e: File): void;
  initialSrc?: string | null;
};

const ImageInputBox: React.FC<ImageInputBoxProps> = ({
  closeBox,
  submit,
  initialSrc,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(dummyProfile);
  const [tempFile, setTempFile] = useState<File | null>(null);

  useEffect(() => {
    setImgSrc(initialSrc ?? dummyProfile);
  }, [initialSrc]);

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (event?.target.files.length) {
      const imgTarget = event.target.files[0];
      setTempFile(event.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        if (e.target) {
          setImgSrc(String(e.target.result));
        }
      };
    } else {
      setImgSrc(dummyProfile);
    }
  };

  const onUploadClick = useCallback(() => {
    if (tempFile) {
      submit(tempFile);
      closeBox();
    }
  }, [closeBox, submit, tempFile]);

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

      <div className={styles.buttonLine}>
        <BlueButton text={"확인"} onClick={onUploadClick} />
      </div>
    </div>
  );
};

export default ImageInputBox;
