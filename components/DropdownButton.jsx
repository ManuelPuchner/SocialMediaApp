import { useState, useEffect, useCallback } from "react";
import Router from "next/router";

function DropdownButton({ content, post }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) window.addEventListener("click", dropdown);
    return () => window.removeEventListener("click", dropdown);
  }, [dropdown, isOpen]);

  const buttonClickAction = (action) => {
    if (action === "edit") {
      console.log("edit");
    } else if (action === "delete") {
      deletePost(post._id);
      console.log("delete");
    }
  }

  const deletePost = async () => {
    console.log("delete");
    const result = await fetch(`/api/deletePost?id=${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    if(data.status === "error") {
      console.log(data.message);
    } else if(data.status === "success"){
      Router.reload();
      console.log(data.message);
    }
  };

  return (
    <div className="dropdown-wrapper relative">
      <button onClick={dropdown}>X</button>
      <div
        className={`
        dropdown-menu absolute right-4
        overflow-hidden ${isOpen ? "h-auto px-4 py-2" : "h-0"}
        bg-gradient-to-br from-green-400 to-blue-500
        rounded-md
      `}
      >
        {content.map((item, index) => {
          return (
            <div
              key={index}
              className={`
                dropdown-menu__item
                p-2
                rounded-md
                flex
                justify-between
                hover:underline
              `}
            >
              {item.type === "button" ? (
                <button className="dropdown-menu__item__button" onClick={() => buttonClickAction(item.action)}>
                  {item.text}   
                </button>
              ) : (
                <a className="dropdown-menu__item__button">{item.text}</a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DropdownButton;
