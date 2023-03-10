import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { MdVerified } from "react-icons/md";

function ModalSuccess({ children, text }) {
  const [modal, setModal] = useState(true);
  const [time, setTime] = useState(5);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    time > 0 && setInterval(() => setTime(time - 1), 1000);
    if (time == 1) {
      window.location.replace("/signin");
    }
  });

  return (
    <div>
      <Modal
        isOpen={modal}
        fade={true}
        toggle={toggle}
        size="sm"
        backdrop
        centered
        className="position-relative"
      >
        <div className="d-flex flex-column modal-header-custom mb-5">
          {children}
        </div>
        <ModalBody className="position-relative mt-4 mb-2 text-center text-white">
          {text}
          <p className="mt-2 text-white">
            You Will be redirected in{" "}
            <span className="text-warning">{time}s</span>
          </p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalSuccess;
