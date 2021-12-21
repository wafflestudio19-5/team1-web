import React, { FC, useCallback, useState } from "react";
import styles from "./Settings.module.scss";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import Markdown from "../../../Components/Markdown/Markdown";
import BlueButton from "../../../Components/BlueButton/BlueButton";

interface SettingsProps {}

export const Settings: FC<SettingsProps> = ({}) => {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const saveProfile = useCallback(() => {
    // TODO
    console.log("save profile");
  }, []);
  const cancel = useCallback(() => {
    // TODO
    console.log("cancel profile edit");
  }, []);

  return (
    <div className={styles.Settings}>
      <SettingsMenu />
      <section>
        <h2>Edit your profile</h2>
        <hr />
        <h3>Public information</h3>
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
        <h3>Links</h3>
        <div className={`${styles.box} ${styles.links}`}>
          <div className={styles.linkItem}>
            <label htmlFor={"website-link"}>Website link</label>
            <input
              id={"website-link"}
              value={websiteLink}
              onInput={(e) => setWebsiteLink(e.currentTarget.value)}
            />
          </div>
          <div className={styles.linkItem}>
            <label htmlFor={"github-link"}>Github link or username</label>
            <input
              id={"github-link"}
              value={githubLink}
              onInput={(e) => setGithubLink(e.currentTarget.value)}
            />
          </div>
        </div>
        <BlueButton text={"Save profile"} onClick={saveProfile} />
        <button className={styles.cancel} onClick={cancel}>
          Cancel
        </button>
      </section>
    </div>
  );
};
