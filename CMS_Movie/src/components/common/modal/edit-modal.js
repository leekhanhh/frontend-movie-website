import React from "react";
import { Modal, Button } from "antd";

const ModalEdit = (props) => {
  return (
    <>
      {props.isModal && (
        <Modal
          title={props.title}
          open={props.isModal}
          onOk={() => props.toggleEdit()}
          onCancel={() => props.toggleEdit()}
          footer={[]}
        >
          {props.form}
        </Modal>
      )}
    </>
  );
};

export default ModalEdit;
