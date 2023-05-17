import React, { useCallback, useEffect } from "react";
import cn from "classnames";

import "./index.scss";
import { RegistrationForm } from "../Form/RegistrationForm";

export const Modal = ({ setModalActive, modalActive, children }) => {
  const closeOnEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        document.removeEventListener("keydown", closeOnEsc);
        setModalActive(false);
      }
    },
    [setModalActive]
  );

  useEffect(() => {
    const modal = document.getElementById("modal");
    document.addEventListener("keydown", closeOnEsc);

    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [closeOnEsc]);

  return (
    <div id="modalId" className={cn("modal", { active: modalActive })}>
      <div className={cn("modal__content", { active: modalActive })}>
        <span className="modal__close" onClick={() => setModalActive(false)}>
          X
        </span>
        {/* <RegistrationForm /> */}
        {children}
      </div>
    </div>
  );
};

/* useCallback - для оптимизации. Он следит за фукцией, за ее вызовом и не позволяет рендериться без надобности. */
