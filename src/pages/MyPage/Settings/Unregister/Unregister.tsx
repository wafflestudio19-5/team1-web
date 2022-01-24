import React, { useState } from "react";

import styles from "./Unregister.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../api/api";
import { useSessionContext } from "../../../../contexts/SessionContext";

const Unregister = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const { refreshMyProfile } = useSessionContext();

  const deleteProfile = async () => {
    try {
      await api.deleteProfile();
      toast.success("삭제되었습니다", { autoClose: 3000 });
      await refreshMyProfile();
      navigate("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.msg, { autoClose: 3000 });
      }
    }
  };

  return (
    <div className={styles.unregister}>
      <div className={styles.titleBox}>
        <h1 className={styles.deleteTitle}>Delete Profile</h1>
      </div>

      <p>
        Before confirming that you would like your profile deleted, we'd like to
        take a moment to explain the implications of deletion:
      </p>

      <ul className={styles.warningList}>
        <li>
          Deletion is irreversible, and you will have no way to regain any of
          your original content, should this deletion be carried out and you
          change your mind later on.
        </li>
        <li>
          Your questions and answers will remain on the site, but will be
          disassociated and anonymized (the author will be listed as
          "user17649634") and will not indicate your authorship even if you
          later return to the site.
        </li>
      </ul>

      <p>
        Confirming deletion will only delete your profile on Stack Overflow - it
        will not affect any of your other profiles on the Stack Exchange
        network. If you want to delete multiple profiles, you'll need to visit
        each site separately and request deletion of those individual profiles.
      </p>

      <label className={styles.lastCheckBox}>
        <input
          className={styles.lastCheckInput}
          type={"checkbox"}
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <span className={styles.lastCheckText}>
          I have read the information stated above and understand the
          implications of having my profile deleted. I wish to proceed with the
          deletion of my profile.
        </span>
      </label>

      <button
        className={`${styles.deleteButton} ${checked ? styles.checked : ""}`}
        onClick={checked ? deleteProfile : () => {}}
      >
        Delete profile
      </button>
    </div>
  );
};

export default Unregister;
