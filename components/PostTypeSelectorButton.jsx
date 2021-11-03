const PostTypeSelectorButton = (props) => {
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
export default PostTypeSelectorButton;
