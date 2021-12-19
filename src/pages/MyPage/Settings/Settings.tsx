import React, { FC, useState } from "react";
import styles from "./Settings.module.scss";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import Markdown from "../../../Components/Markdown/Markdown";

interface SettingsProps {}

export const Settings: FC<SettingsProps> = ({}) => {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  return (
    <div className={styles.Settings}>
      <SettingsMenu />
      <section>
        <h2>Edit your profile</h2>
        <hr />
        <p>Public information</p>
        <div className={styles.box}>
          <label>Profile image</label>
          <div className={styles.profileImgContainer}>
            <img
              className={styles.profileImg}
              src={
                "https://www.gravatar.com/avatar/c7dce3957212482f3c931cce947e69e2?s=256&d=identicon&r=PG"
              }
              alt={"profile_image"}
              height={164}
              width={164}
            />
            <button className={styles.changePicture}>Change picture</button>
          </div>
          <label htmlFor={"display-name"}>Display name</label>
          <input
            id={"display-name"}
            value={displayName}
            onInput={(e) => setDisplayName(e.currentTarget.value)}
          />
          <label htmlFor={"location"}>Location</label>
          <input
            id={"location"}
            value={location}
            onInput={(e) => setLocation(e.currentTarget.value)}
          />
          <label htmlFor={"title"}>Title</label>
          <input
            id={"title"}
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <label htmlFor={"about-me"}>About me</label>
          <Markdown
            setState={(value) => setAboutMe(value ?? "")}
            state={aboutMe}
          />
        </div>
      </section>
    </div>
  );
};
