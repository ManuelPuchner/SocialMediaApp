import { FormInput, FormLabel, FormTextarea } from "./FormComponents";
import { useState } from "react";
const Post = ({ type, setPost }) => {
  return (
    <>
      {type == "text" && <TextPost setPost={setPost} />}
      {type == "image" && <ImagePost setPost={setPost} />}
      {type == "video" && <VideoPost setPost={setPost} />}
      {type == "gif" && <GifPost setPost={setPost} />}
    </>
  );
};

const Row = ({ children, height50 }) => {
  return (
    <div className={`flex flex-col sm:w-1/2 ${height50 ? "h-1/2" : ""}`}>
      {children}
    </div>
  );
};

const TextPost = ({ setPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function handleChange() {
    let post = {
      type: "text",
      title,
      content,
    };
    setPost(post);
  }
  function handleSubmit(e) {
    e.preventDefault();
    
  }
  return (
    <div className="text-post-input h-full">
      <form onSubmit={handleSubmit} className="h-full">
        <Row>
          <FormLabel>Title: </FormLabel>
          <FormInput
            type="text"
            placeholder="Your amazing title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleChange();
            }}
          />
        </Row>
        <Row height50>
          <FormLabel>Content: </FormLabel>
          <FormTextarea
            type="text"
            placeholder="Your amazing content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleChange();
            }}
          />
        </Row>
      </form>
    </div>
  );
};
const ImagePost = ({setPost}) => {
  return <div className="image-post-input">
    Not working yet
  </div>;
};
const VideoPost = ({setPost}) => {
  return <div className="video-post-input">
    Not working yet
  </div>;
};
const GifPost = ({setPost}) => {
  return <div className="gif-post-input">
    Not working yet
  </div>;
};

export default Post;
