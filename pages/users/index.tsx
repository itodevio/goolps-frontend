import React, { useState } from "react";
import { Button, Heading } from "grommet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Modal, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { Edit, Search, Trash } from "grommet-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import EditUserModal from "../../components/Users/EditUser.modal";
import NewUserModal from "../../components/Users/NewUser.modal";
import UserDetailsModal from "../../components/Users/UserDetails.model";
import Head from "next/head";
import UserService from "services/User.service";
import { StoredUser } from "interfaces/User.interface";

const { confirm } = Modal;

const Users = () => {
  const [visibleModal, setVisibleModal] = useState("");
  const toggleVisibleModal = (modalName?: string) => {
    if (visibleModal !== "" && modalName) {
      setVisibleModal(modalName);
    }
    setVisibleModal("");
  };

  const [userToAction, setIngredientToAction] = useState<StoredUser>();

  const { data, isLoading } = useQuery("usersQuery", UserService.get, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(
    "deleteProductMutation",
    (userId: string) => UserService.delete(userId),
    {
      onSuccess: () => {
        queryClient.setQueryData("usersQuery", (oldData: StoredUser[]) => {
          return oldData.filter((data) => data._id !== userToAction._id);
        });
      },
    }
  );

  const toggleDeleteConfirm = (userId: string) => {
    confirm({
      title: "Pense bem, deseja mesmo excluir este usuário ?",
      icon: <ExclamationCircleOutlined />,
      content: "Após excluido o usuário não poderá ser recuperado!",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        deleteProductMutation.mutate(userId);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Goolps! - Usuários</title>
      </Head>
      <NewUserModal
        visible={visibleModal === "newUser"}
        toggle={() => toggleVisibleModal("newUser")}
      />
      {userToAction && (
        <>
          <UserDetailsModal
            user={userToAction}
            visible={visibleModal === "detailUser"}
            toggle={() => toggleVisibleModal("detailUser")}
          />
          <EditUserModal
            user={userToAction}
            visible={visibleModal === "editUser"}
            toggle={() => toggleVisibleModal("editUser")}
          />
        </>
      )}
      <div className="flex justify-between">
        <Heading margin="none" size="small">
          Usuários
        </Heading>
        <Button primary label="Novo usuário" onClick={() => setVisibleModal("newUser")} />
      </div>
      <Table className="mt-6" dataSource={data} loading={isLoading} rowKey="_id">
        <Column key="firstName" title="Nome" dataIndex="firstName" />
        <Column key="lastName" title="Sobrenome" dataIndex="lastName" />
        <Column key="email" title="E-mail" dataIndex="email" />
        <Column key="password" title="Senha" dataIndex="password" />
        <Column key="role" title="Papel" dataIndex="role" />
        <Column
          title="Ações"
          key="actions"
          render={(text, record: StoredUser) => (
            <Space size="middle">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIngredientToAction(record);
                  setVisibleModal("detailUser");
                }}
              >
                <Search />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIngredientToAction(record);
                  setVisibleModal("editUser");
                }}
              >
                <Edit />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIngredientToAction(record);
                  toggleDeleteConfirm(record._id);
                }}
              >
                <Trash />
              </p>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Users;
