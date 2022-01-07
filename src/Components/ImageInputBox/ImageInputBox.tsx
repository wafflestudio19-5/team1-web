import React, { useEffect, useRef, useState } from "react";

import styles from "./ImageInputBox.module.scss";
import BlueButton from "../BlueButton/BlueButton";

type ImageInputBoxProps = {
  state: File | null;
  setState(e: File | null): void;
  closeBox(): void;
};

const DEFAULTIMAGE = "/icons/dummyProfile.png";

const ImageInputBox: React.FC<ImageInputBoxProps> = ({
  state,
  setState,
  closeBox,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(DEFAULTIMAGE);
  const [tempFile, setTempFile] = useState<File | null>(null);

  useEffect(() => {
    if (state) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(state);
      fileReader.onload = function (e) {
        if (e.target) {
          setImgSrc(String(e.target.result));
        }
      };
    }
  }, []);
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
      setImgSrc(DEFAULTIMAGE);
    }
  };

  const sendImgToMyPage = () => {
    if (tempFile) {
      setState(tempFile);
    }
    closeBox();
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

      <div className={styles.buttonLine}>
        <BlueButton text={"확인"} onClick={sendImgToMyPage} />
      </div>
    </div>
  );
};

export default ImageInputBox;
