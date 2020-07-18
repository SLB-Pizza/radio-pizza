import React, { useEffect } from "react";

export default function OutsideClick({ children, onClick, id }) {
  const handleClick = (e) => {
    const element = document.getElementById(id);

    if (element && e.target !== element && !element.contains(e.target)) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return children;
}
