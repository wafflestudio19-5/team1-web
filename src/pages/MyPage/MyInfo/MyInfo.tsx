import React, { FC } from "react";

import styles from "./MyInfo.module.scss";

import dummyProfile from "../../../icons/dummyProfile.svg";
import { UserInfoResponse } from "../../../interface/interface";
import locationIcon from "../../../icons/iconLocation.svg";

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
        <span className={styles.userLocation}>
          <img src={locationIcon} alt={""} />
          {userInfo?.location}
        </span>
      </div>
    </div>
  ) : null;
};

export default MyInfo;
