import React from "react";
import { Modal, Button } from "antd";

const ModalComp = (props) => {
  return (
    <>
      {props.isModal && (
        <Modal
          title={props.title}
          open={props.isModal}
          onOk={() => props.toggleNew()}
          onCancel={() => props.toggleNew()}
          footer={[]}
        >
          {props.form}
        </Modal>
      )}
    </>
  );
};

export default ModalComp;
