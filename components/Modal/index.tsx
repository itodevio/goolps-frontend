import React from "react";
import { Modal as AntdModal } from "antd";
import "./Modal.module.scss";

interface ModalProps {
  title: React.ReactNode | string;
  children: React.ReactNode;
  width: string | number;
  visible: boolean;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  onCancel?: () => void;
  afterClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const { title, children, width, visible, destroyOnClose, forceRender, onCancel, afterClose } =
    props;
  return (
    <AntdModal
      title={title}
      visible={visible}
      onCancel={onCancel}
      afterClose={afterClose}
      footer={null}
      width={width}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
