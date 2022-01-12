import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import { MarkdownEditor } from "../../../Components/Markdown/Markdown";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import ImageInputBox from "../../../Components/ImageInputBox/ImageInputBox";
import dummyProfile from "../../../icons/dummyProfile.svg";
import { toast } from "react-toastify";

interface SettingsProps {}

export const Settings: FC<SettingsProps> = () => {
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const [profile, setProfile] = useState<File | null>(null);

  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (profile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(profile);
      fileReader.onload = function (e) {
        if (e.target) {
          setImgSrc(String(e.target.result));
        }
      };
    }
  }, [profile]);

  const [changeProfileOn, setChangeProfileOn] = useState<boolean>(false);
  const saveProfile = useCallback(() => {
    toast.error("Not Implemented!");
  }, []);
  const cancel = useCallback(() => {
    toast.error("Not Implemented!");
  }, []);

  return (
    <div className={styles.Settings}>
      {changeProfileOn && (
        <div className={styles.addImageContainer}>
          <ImageInputBox
            state={profile}
            setState={setProfile}
            closeBox={() => {
              setChangeProfileOn(false);
            }}
          />
        </div>
      )}

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
              src={imgSrc !== "" ? imgSrc : dummyProfile}
              alt={"profile_image"}
              height={164}
              width={164}
            />
            <button
              className={styles.changePicture}
              onClick={() => {
                setChangeProfileOn(true);
              }}
            >
              Change picture
            </button>
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
          <MarkdownEditor
            onChange={(value) => setAboutMe(value ?? "")}
            value={aboutMe}
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
        <div className={styles.buttons}>
          <BlueButton text={"Save profile"} onClick={saveProfile} />
          <button className={styles.cancel} onClick={cancel}>
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};
