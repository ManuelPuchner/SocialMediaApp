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
export default Loader;
