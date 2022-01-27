import React, { FC } from "react";

import styles from "./MyInfo.module.scss";

import dummyProfile from "../../../icons/dummyProfile.svg";
import { UserInfoResponse } from "../../../interface/interface";
import locationIcon from "../../../icons/iconLocation.svg";
import githubIcon from "../../../icons/iconGithub.svg";
import linkIcon from "../../../icons/iconLink.svg";

interface MyInfoProps {
  userInfo: UserInfoResponse;
}

const MyInfo: FC<MyInfoProps> = ({ userInfo }) => {
  return userInfo ? (
    <div className={styles.userInfo}>
      <img
        className={styles.profileImg}
        src={userInfo.image ? userInfo.image : dummyProfile}
        alt={"profile"}
        height={128}
        width={128}
      />
      <div className={styles.infoDetail}>
        <span className={styles.userName}>{userInfo?.username}</span>
        <span className={styles.userTitle}>{userInfo?.userTitle}</span>
        <span className={styles.userMisc}>
          {userInfo?.githubLink && (
            <a
              className={styles.userMiscItem}
              href={`https://github.com/${userInfo?.githubLink}`}
            >
              <img src={githubIcon} alt={"Github link"} />
            </a>
          )}
          {userInfo?.websiteLink && (
            <a
              href={`https://${userInfo.websiteLink}`}
              className={styles.userMiscItem}
            >
              <img src={linkIcon} alt={"Website link"} />
              {userInfo.websiteLink}
            </a>
          )}
          {userInfo?.location && (
            <span className={styles.userMiscItem}>
              <img src={locationIcon} alt={""} />
              {userInfo?.location}
            </span>
          )}
        </span>
      </div>
    </div>
  ) : null;
};

export default MyInfo;
