import { useState } from "react";

import Loader from "./Loader";
import PostTypeSelectorButton from "components/PostTypeSelectorButton";

const CreatePostSection = ({ show }) => {
  const [postType, setPostType] = useState("text");
  const [isPublishing, setIsPublishing] = useState(false);

  async function publishPost() {
    setIsPublishing(!isPublishing);
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
          className={`content ${
            isPublishing ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          <h3 className="text-xl font-medium m-3">Create a new Post</h3>
          <div className="post-selection">
            <h4 className="post-selection__header mx-3">
              Select the type of post you want to make
            </h4>
            <div className="post-type-selector-wrapper flex justify-center">
              <PostTypeSelectorButton
                onClick={() => setPostType("text")}
                isSelected={postType == "text"}
              >
                Text
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostType("image")}
                isSelected={postType == "image"}
              >
                Image
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostType("video")}
                isSelected={postType == "video"}
              >
                Video
              </PostTypeSelectorButton>
              <PostTypeSelectorButton
                onClick={() => setPostType("gif")}
                isSelected={postType == "gif"}
              >
                Gif
              </PostTypeSelectorButton>
            </div>
            {postType}
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
