const PostCard = ({ post }) => {
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
            src={`https://eu.ui-avatars.com/api/?name=${post.account.username}`}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="postcard__header__info">
          <div className="postcard__header__info__name">
            {post.account.username}
          </div>
        </div>
      </div>
      <h4 className="title">{post.title}</h4>
      <div className="content">{JSON.stringify(post.content)}</div>
    </div>
  );
};

export default PostCard;
