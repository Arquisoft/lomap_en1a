import React from "react";

const ModalBackdrop = ({ children, duration, state }) => {
  const defaultStyle = {
    transition: `background-color ${duration}ms ease-in-out, z-index ${duration}ms ease-in-out`,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: -1000
  };

  const transitionStyles = {
    entering: { backgroundColor: "rgba(0, 0, 0, 0)", zIndex: -1000 },
    entered: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10000 }
  };
  return (
    <div
      className="modal-backdrop"
      style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}
    >
      {children}
    </div>
  );
};

export default ModalBackdrop;
