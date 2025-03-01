import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    document.title = `${user?.fName || ""}${
      user?.fName.endsWith("s") ? "'" : "'s"
    } Profile - P. Notas`;
  }, [user?.fName]);
  return <></>;
};

export default Profile;
