import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import MyInfo from "./MyInfo/MyInfo";

import styles from "./MyPage.module.scss";
import MyPageTab from "./MyPageTab/MyPageTab";
import { useLocation, useParams } from "react-router";
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

interface MyPageProps {
  me: boolean;
}

const useUserInfo = (me: boolean) => {
  const { userInfo: myInfo, refreshMyProfile } = useSessionContext();
  const [userInfo, setUserInfo] = useState<UserInfoResponse>();
  const params = useParams();
  const navigate = useNavigate();
  const userId = useMemo(() => {
    if (me) return null;
    const rawUserId = Number(params.id);
    return isNaN(rawUserId) ? null : rawUserId;
  }, [me, params.id]);
  const refreshUserInfo = useCallback(async () => {
    if (userId === null) {
      setUserInfo(undefined);
      toast.error("Invalid user id");
      navigate(-1);
      return;
    } else if (userId === myInfo?.id) {
      navigate("/users/me");
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
    ? { userInfo: myInfo, refreshUserInfo: refreshMyProfile }
    : { userInfo, refreshUserInfo };
};

const MyPage: FC<MyPageProps> = ({ me }) => {
  const qs = new URLSearchParams(useLocation().search);
  const tab = qs.get("tab") ?? "profile";
  const { userInfo, refreshUserInfo } = useUserInfo(me);
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
    <div className={styles.myPage}>
      {me && <ProfileButtons />}
      <MyInfo userInfo={userInfo} />
      <MyPageTab mode={tab} me={me} />
      {me && tab === "settings" && <Settings />}
      {tab === "profile" && <MyPageProfile userInfo={userInfo} me={me} />}
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <BeatLoader />
    </div>
  );
};

export default MyPage;
