import React, { useState } from "react";
import { Button, Heading } from "grommet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import IngredientService from "services/Ingredient.service";
import { Modal, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { Edit, Search, Trash } from "grommet-icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { StoredIngredient } from "interfaces/Ingredient.interface";
import EditIngredientModal from "../../components/Ingredients/EditIngredient.modal";
import NewIngredientModal from "../../components/Ingredients/NewIngredient.modal";
import IngredientDetailsModal from "../../components/Ingredients/IngredientDetails.model";
import Head from "next/head";

const { confirm } = Modal;

const Ingredients = () => {
  const [visibleModal, setVisibleModal] = useState("");
  const toggleVisibleModal = (modalName?: string) => {
    if (visibleModal !== "" && modalName) {
      setVisibleModal(modalName);
    }
    setVisibleModal("");
  };

  const [ingredientToAction, setIngredientToAction] = useState<StoredIngredient>();

  const { data, isLoading } = useQuery("ingredientsQuery", IngredientService.get, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(
    "deleteProductMutation",
    (ingredientId: string) => IngredientService.delete(ingredientId),
    {
      onSuccess: () => {
        queryClient.setQueryData("ingredientsQuery", (oldData: StoredIngredient[]) => {
          return oldData.filter((data) => data._id !== ingredientToAction._id);
        });
      },
    }
  );

  const toggleDeleteConfirm = (ingredientId: string) => {
    confirm({
      title: "Pense bem, deseja mesmo excluir este ingrediente ?",
      icon: <ExclamationCircleOutlined />,
      content: "Após excluido o Ingrediente não poderá ser recuperado!",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        deleteProductMutation.mutate(ingredientId);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Goolps! - Ingredientes</title>
      </Head>
      <NewIngredientModal
        visible={visibleModal === "newIngredient"}
        toggle={() => toggleVisibleModal("newIngredient")}
      />
      {ingredientToAction && (
        <>
          <IngredientDetailsModal
            ingredient={ingredientToAction}
            visible={visibleModal === "detailIngredient"}
            toggle={() => toggleVisibleModal("detailIngredient")}
          />
          <EditIngredientModal
            ingredient={ingredientToAction}
            visible={visibleModal === "editIngredient"}
            toggle={() => toggleVisibleModal("editIngredient")}
          />
        </>
      )}
      <div className="flex justify-between">
        <Heading margin="none" size="small">
          Ingredientes
        </Heading>
        <Button primary label="Novo Ingrediente" onClick={() => setVisibleModal("newIngredient")} />
      </div>
      <Table className="mt-6" dataSource={data} loading={isLoading} rowKey="_id">
        <Column key="name" title="Nome" dataIndex="name" />
        <Column key="qtt" title="Quantidade" dataIndex="qtt" />
        <Column key="unit" title="Unidade" dataIndex="unit" />
        <Column key="lotNumber" title="Número do Lote" dataIndex="lotNumber" />
        <Column
          title="Ações"
          key="actions"
          render={(text, record: StoredIngredient) => (
            <Space size="middle">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIngredientToAction(record);
                  setVisibleModal("detailIngredient");
                }}
              >
                <Search />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIngredientToAction(record);
                  setVisibleModal("editIngredient");
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

export default Ingredients;
