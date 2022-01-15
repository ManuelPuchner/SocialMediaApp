import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "./Loader";
import PostTypeSelectorButton from "components/PostTypeSelectorButton";
import Post from "./Post";

const CreatePostSection = ({ show, setShow }) => {
  const [postType, setPostType] = useState("text");
  const [isPublishing, setIsPublishing] = useState(false);
  const [post, setPost] = useState({});
  function setPostTypeWrapper(type) {
    setPost({});
    setPostType(type);
  }
  async function publishPost() {
    if (!isPublishing) {
      setIsPublishing(true);
      const result = await fetch(`${router.basePath}/api/createPost/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await result.json();

      if ((data.status = "ok")) {
        setPost({});
        setShow(false);
      }
      setIsPublishing(false);
    }
  }
  return (
    <>
      <div
        className={`
          w-screen h-screen fixed transform
          top-0 left-0 transition-transform
          rounded-t-2xl bg-white dark:bg-gray-800
          p-4
          ${show ? "translate-y-20" : "translate-y-full"}
        `}
      >
        <Loader isPublishing={isPublishing} />
        <div
          className={`content h-full ${
            isPublishing ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          <h3 className="text-xl font-medium m-3">Create a new Post</h3>
          <div className="post-selection h-full">
            <h4 className="post-selection__header mx-3">
              Select the type of post you want to make
            </h4>
            <div className="post-type-selector-wrapper flex justify-center">
              <PostTypeSelectorButton
                onClick={() => setPostTypeWrapper("text")}
                isSelected={postType == "text"}
              >
                Text
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostTypeWrapper("image")}
                isSelected={postType == "image"}
              >
                Image
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostTypeWrapper("video")}
                isSelected={postType == "video"}
              >
                Video
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostTypeWrapper("gif")}
                isSelected={postType == "gif"}
              >
                Gif
              </PostTypeSelectorButton>
            </div>
            <Post type={postType} setPost={setPost} />
          </div>
        </div>

        <button
          className="
            absolute bottom-28
            right-8 py-1.5 px-4
            border-2 border-black
            transition
            rounded-md
            transform
            hover:shadow-lg
            hover:-translate-y-0.5
          "
          onClick={publishPost}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default CreatePostSection;
