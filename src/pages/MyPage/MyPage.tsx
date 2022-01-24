import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import MyInfo from "./MyInfo/MyInfo";

import styles from "./MyPage.module.scss";
import MyPageTab from "./MyPageTab/MyPageTab";
import { Navigate, useLocation, useParams } from "react-router";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import MyPageProfile from "./MyPageProfile/MyPageProfile";
import { useSessionContext } from "../../contexts/SessionContext";
import { Settings } from "./Settings/Settings";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserInfoResponse } from "../../interface/interface";
import { api } from "../../api/api";
import BeatLoader from "react-spinners/BeatLoader";

interface MyPageProps {}

const useUserInfo = (userId: number | null) => {
  const { userInfo: myInfo, refreshMyProfile } = useSessionContext();
  const [userInfo, setUserInfo] = useState<UserInfoResponse>();
  const navigate = useNavigate();
  const me = myInfo ? userId === myInfo.id : false;
  console.log("user id", userId);
  console.log("my id", myInfo?.id);
  console.log("me", me);
  const refreshUserInfo = useCallback(async () => {
    if (userId === null) {
      setUserInfo(undefined);
      toast.error("Invalid user id");
      navigate(-1);
      return;
    } else if (userId === myInfo?.id) {
      return;
    }
    try {
      const newUserInfo = await api.getUserProfile(userId);
      setUserInfo(newUserInfo);
    } catch (e) {
      setUserInfo(undefined);
      throw e;
    }
  }, [myInfo?.id, navigate, userId]);
  return me
    ? { userInfo: myInfo, refreshUserInfo: refreshMyProfile, me }
    : { userInfo, refreshUserInfo, me };
};

const MyPage: FC<MyPageProps> = () => {
  const params = useParams();
  const userId = useMemo(() => {
    const rawUserId = Number(params.id);
    return isNaN(rawUserId) ? null : rawUserId;
  }, [params.id]);
  const qs = new URLSearchParams(useLocation().search);
  const tab = qs.get("tab") ?? "profile";
  const { userInfo, refreshUserInfo, me } = useUserInfo(userId);
  const navigate = useNavigate();
  useEffect(() => {
    const doIt = async () => {
      try {
        await refreshUserInfo();
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.status === 401) {
            toast.error("Please sign in first");
            navigate("/login", { replace: true });
          } else if (e.response.status === 404) {
            toast.error("User not found");
            navigate(-1);
          } else console.error(e.response.data);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [navigate, refreshUserInfo]);

  return userInfo ? (
    <div className={styles.userPage}>
      {me && <ProfileButtons />}
      <MyInfo userInfo={userInfo} />
      <MyPageTab mode={tab} me={me} />
      {me && tab === "settings" ? (
        <Settings />
      ) : tab === "profile" ? (
        <MyPageProfile userInfo={userInfo} me={me} />
      ) : (
        <Navigate to={"?profile"} />
      )}
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <BeatLoader />
    </div>
  );
};

export default MyPage;
