import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./components/reducers/userReducer";

const Feed = () => {
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/user/feed`, {
      method: "POST",
      body: JSON.stringify({ following: currentUser.user.following }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });

  return <></>;
};

export default Feed;
