import { Descriptions } from "antd";
import Modal from "components/Modal";
import { User } from "interfaces/User.interface";
import React from "react";

interface UserDetailsProps {
  user: User;
  visible: boolean;
  toggle: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = (props) => {
  const { user, visible, toggle } = props;
  return (
    <Modal title="Visualizar detalhes" visible={visible} width={1024} onCancel={toggle}>
      <Descriptions title={`Detalhes de ${user.firstName}`}>
        <Descriptions.Item label="Nome">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Sobrenome">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Papel">{user.role}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserDetails;
