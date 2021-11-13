import React from "react";

const Post = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.image}></img>
      <p>{props.text}</p>
    </div>
  );
};

export default Post;
