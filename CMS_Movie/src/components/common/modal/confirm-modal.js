import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const LocalizedModal = (props) => {
    return (
      <>
        <Modal
          title="Confirm Modal"
          open={props.isModal}
          onOk={props.onDelete}
          onCancel={props.toggleModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p className='font-bold text-xl'>Are you want to delete this item?</p>
        </Modal>
      </>
    );
  };
const ConfirmModal = (props) => {
    
  return (
    <>
      <Space>
        <LocalizedModal isModal={props.isModal} toggleModal={props.toggleModal} onDelete={props.onDelete} />
      </Space>

    </>
  )
};
export default ConfirmModal;