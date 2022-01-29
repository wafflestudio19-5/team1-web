import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import { MarkdownEditor } from "../../../Components/Markdown/Markdown";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import ImageInputBox from "../../../Components/ImageInputBox/ImageInputBox";
import dummyProfile from "../../../icons/dummyProfile.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../../api/api";
import { useSessionContext } from "../../../contexts/SessionContext";
import { EditInfo } from "../../../interface/interface";
import BeatLoader from "react-spinners/BeatLoader";
import Unregister from "./Unregister/Unregister";
import { useNavigate } from "react-router-dom";

interface SettingsProps {}

export const Settings: FC<SettingsProps> = () => {
  const { userInfo, refreshMyProfile } = useSessionContext();

  const [mode, setMode] = useState<string>("edit");

  const [editInfo, setEditInfo] = useState<EditInfo | null>(null);

  const [imgSrc, setImgSrc] = useState<string>("");

  const [loadingOn, setLoadingOn] = useState<boolean>(false);

  const resetUserInfo = useCallback(() => {
    setImgSrc(userInfo?.image ?? "");
    setEditInfo({
      displayName: userInfo?.username ?? null,
      location: userInfo?.location ?? null,
      userTitle: userInfo?.userTitle ?? null,
      aboutMe: userInfo?.aboutMe ?? null,
      websiteLink: userInfo?.websiteLink ?? null,
      githubLink: userInfo?.githubLink ?? null,
    });
  }, [userInfo]);
  useEffect(() => {
    resetUserInfo();
  }, [resetUserInfo]);

  const [changeProfileOn, setChangeProfileOn] = useState<boolean>(false);
  const navigate = useNavigate();
  const saveProfileImage = async (profileImage: File) => {
    try {
      if (profileImage === null) {
        return;
      }
      const object = new FormData();
      object.append("image", profileImage);
      await api.editProfile(object);
      toast.success("Image uploaded!");
      await refreshMyProfile();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          if (e.response.status === 401) {
            toast.error("Please login again!");
            navigate("/login");
          } else if (e.response.status === 500) {
            toast.error("Something went wrong on server...");
          } else {
            toast.error(`Unexpected error: ${e.response.status}`);
          }
        } else {
          toast.error("Cannot connect to server");
        }
      } else console.error(e);
    }
  };
  const cancel = useCallback(() => {
    resetUserInfo();
    toast.success("수정사항이 초기화되었습니다");
  }, [resetUserInfo]);

  const submit = useCallback(() => {
    const doIt = async () => {
      try {
        setLoadingOn(true);
        if (editInfo !== null) {
          await api.editUserInfo(editInfo);
          toast.success("수정되었습니다", { autoClose: 3000 });
          await refreshMyProfile();
        } else {
          toast.error("수정된 정보가 없습니다", { autoClose: 3000 });
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            toast.error(e.response?.data?.msg, { autoClose: 3000 });
          } else toast.error("Cannot connect to server");
        } else {
          console.error(e);
        }
      }
      setLoadingOn(false);
    };
    doIt().then();
  }, [editInfo, refreshMyProfile]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editInfo !== null) {
      setEditInfo({ ...editInfo, [name]: value });
    }
  };

  const changeAboutMe = (text: string | undefined) => {
    if (editInfo !== null) {
      setEditInfo({ ...editInfo, aboutMe: text ?? null });
    }
  };

  return (
    <div className={styles.Settings}>
      {loadingOn && (
        <div className={styles.loadingOn}>
          <BeatLoader />
        </div>
      )}
      {changeProfileOn && (
        <div className={styles.addImageContainer}>
          <ImageInputBox
            initialSrc={userInfo?.image}
            closeBox={() => {
              setChangeProfileOn(false);
            }}
            submit={saveProfileImage}
          />
        </div>
      )}

      <SettingsMenu mode={mode} setMode={setMode} />
      {mode === "edit" && (
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
              name={"displayName"}
              value={editInfo?.displayName ?? ""}
              onChange={inputChange}
              readOnly={false}
            />
            <label htmlFor={"location"}>Location</label>
            <input
              id={"location"}
              name={"location"}
              value={editInfo?.location ?? ""}
              onInput={inputChange}
            />
            <label htmlFor={"title"}>Title</label>
            <input
              id={"title"}
              name={"userTitle"}
              value={editInfo?.userTitle ?? ""}
              onInput={inputChange}
            />
            <label htmlFor={"about-me"}>About me</label>

            <MarkdownEditor
              onChange={(value) => changeAboutMe(value)}
              value={editInfo?.aboutMe ?? ""}
            />
          </div>
          <h3>Links</h3>
          <div className={`${styles.box} ${styles.links}`}>
            <div className={styles.linkItem}>
              <label htmlFor={"website-link"}>Website link</label>
              <input
                id={"website-link"}
                name={"websiteLink"}
                value={editInfo?.websiteLink ?? ""}
                onInput={inputChange}
              />
            </div>
            <div className={styles.linkItem}>
              <label htmlFor={"github-link"}>Github username</label>
              <input
                id={"github-link"}
                name={"githubLink"}
                value={editInfo?.githubLink ?? ""}
                onInput={inputChange}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <BlueButton text={"Save profile"} onClick={submit} />
            <button className={styles.cancel} onClick={cancel}>
              Cancel
            </button>
          </div>
        </section>
      )}
      {mode === "unregister" && <Unregister />}
    </div>
  );
};
