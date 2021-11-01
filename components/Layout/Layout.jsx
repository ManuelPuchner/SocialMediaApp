import Link from "next/link";
import { LoggedInContext } from "contextStores";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

/**
 * @todo refractor code
 */
const Loader = ({ isPublishing }) => {
  return (
    <div
      className={`
        loader
        absolute
        top-0
        left-0
        w-full h-full
        ${isPublishing ? "" : "opacity-0"}
      `}
    >
      <div
        className="
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2
          -translate-y-1/2
          
          
        "
      >
        <span className="flex h-14 w-14">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-tl from-blue-500 to-green-400 opacity-75"></span>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-green-400 opacity-75"></span>
        </span>
      </div>
    </div>
  );
};
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
              <PostTypeSelector
                onClick={() => setPostType("text")}
                isSelected={postType == "text"}
              >
                Text
              </PostTypeSelector>
              <PostTypeSelector
                onClick={() => setPostType("image")}
                isSelected={postType == "image"}
              >
                Image
              </PostTypeSelector>
              <PostTypeSelector
                onClick={() => setPostType("video")}
                isSelected={postType == "video"}
              >
                Video
              </PostTypeSelector>
              <PostTypeSelector
                onClick={() => setPostType("gif")}
                isSelected={postType == "gif"}
              >
                Gif
              </PostTypeSelector>
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
const PostTypeSelector = (props) => {
  return (
    <button
      className={`
        post-type transition-all
        mx-4 my-2 border-2 border-black
        px-4 py-1.5 rounded-md
        transform
        hover:shadow-lg
        hover:-translate-y-0.5
          
        ${props.isSelected ? "shadow-lg -translate-y-0.5" : ""}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
const Layout = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [showCreateNewPostSection, setShowCreateNewPostSection] =
    useState(false);
  function logout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  }
  function toggleCreateNewPost() {
    setShowCreateNewPostSection(!showCreateNewPostSection);
    console.log("toggled");
  }
  return (
    <div
      className="
        grid
        grid-rows-layout
        layout min-h-screen
        p-4
        bg-gradient-to-br
      from-green-400
      to-blue-500
      "
    >
      <header className="flex justify-between">
        <div className="branding">Social Media App</div>
        <nav className="flex">
          <Link href="/">
            <a className="mx-1.5">Home</a>
          </Link>
          {!isLoggedIn && (
            <>
              <Link href="/login">
                <a className="mx-1.5">Login</a>
              </Link>
              <Link href="/signup">
                <a className="mx-1.5">SignUp</a>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={toggleCreateNewPost}>
                <span className="border-2 border-black h-5 w-5 block leading-3">
                  +
                </span>
              </button>
              <button onClick={logout} className="mx-1.5">
                Logout
              </button>
              <Link href={`/${jwt.decode(Cookies.get("token")).username}`}>
                <a className="mx-1.5">My Profile</a>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
      {/* static stuff */}
      <CreatePostSection show={showCreateNewPostSection} />
    </div>
  );
};

export default Layout;
