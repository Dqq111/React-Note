import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "./Button.jsx";

// useRef, forwardRef, and useImperativeHandle are used together to expose a function to the outside of this component

// createPortal will only change the place of Modal component in html

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
