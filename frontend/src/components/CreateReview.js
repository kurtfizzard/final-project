import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { CurrentUserContext } from "./reducers/userReducer";
import { format } from "date-fns";
import StarRatingBar from "./StarRatingBar";

const CreateReview = ({ release }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [textEntry, setTextEntry] = useState("");
  const { artists, id, styles, title, tracklist, year } = release;
  const [rating, setRating] = useState(0);
  console.log(rating);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const date = format(new Date(2014, 1, 11), "MM/dd/yyyy");
    // const date = new Date();
    const date = format(new Date(), "PPP");
    // NEED TO PASS THE DATE TO
    if (currentUser && textEntry.length >= 10) {
      const { uid, displayName } = currentUser.user;
      fetch("/reviews/add", {
        method: "POST",
        body: JSON.stringify({
          date: date,
          uid: uid,
          displayName: displayName,
          review: textEntry,
          artists: artists,
          likeCount: 0,
          likes: [],
          rating: rating,
          releaseId: id,
          styles: styles,
          title: title,
          tracklist: tracklist,
          year: year,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
      setTextEntry("");
    } else {
      return;
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextBox
          placeholder="Enter your review."
          value={textEntry}
          onChange={(e) => {
            setTextEntry(e.target.value);
          }}
        ></TextBox>
        <StarRatingBar rating={rating} setRating={setRating} />
        <Submit type="submit">Submit</Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextBox = styled.textarea`
  resize: none;
  margin-bottom: 10px;
  width: 100%;
`;

const Submit = styled.button`
  align-items: center;
  background: #fca311;
  border: none;
  border-radius: 5px;
  display: flex;
  font-weight: bold;
  height: auto;
  justify-content: center;
`;

export default CreateReview;
