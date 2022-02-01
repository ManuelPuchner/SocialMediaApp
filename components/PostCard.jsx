import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import DropdownButton from "./DropdownButton";
const PostCard = ({ post }) => {
  const [isCreator, setIsCreator] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded.user.name === post.authorName) {
        setIsCreator(true);
      }
    }
  }, [post.authorName]);
  return (
    <div
      className="
        postcard
        bg-gray-50
        rounded-xl
        px-4
        py-4
      "
    >
      <div
        className="
          postcard__header
          bg-gray-200
          p-2
          rounded-md
          flex
          justify-between
        "
      >
        <div
          className="left flex
            items-center
          "
        >
          <div
            className="
            postcard__header__image
            h-12
            w-12
          "
          >
            {/* <img src={post.account.profilePicture} alt="post" /> */}
            <img
              src={`https://eu.ui-avatars.com/api/?name=${post.authorName}`}
              alt=""
              className="rounded-full"
            />
          </div>
          <div className="postcard__header__info">
            <a href={`${router.basePath}/${post.authorName}`}>
              <div className="postcard__header__info__name">
                {post.authorName}
              </div>
            </a>
          </div>
        </div>
        <div className="right flex items-center">
          {isCreator && (
            <DropdownButton
              content={[
                // {
                //   type: "button",
                //   action: "edit",
                //   href: "",
                //   text: "Edit"
                // },
                {
                  type: "button",
                  action: "delete",
                  href: "",
                  text: "Delete",
                },
              ]}
              post={post}
            />
          )}
        </div>
      </div>
      <h4 className="title">{post.title}</h4>
      <div className="content">
        {post.content.split("\n").map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
