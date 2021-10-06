import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { Button, Heading } from "grommet";
import { Search, Edit, Trash } from "grommet-icons";
import { StoredOrder } from "interfaces/Order.interface";
import Head from "next/head";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import OrderService from "services/Orders.service";
import { getPortPaymentType } from "utils/order.utils";
import EditOrderModal from "../../components/Orders/EditOrder.modal";
import NewOrderModal from "../../components/Orders/NewOrder.modal";
import OrderDetailsModal from "../../components/Orders/OrderDetails.modal";

const { confirm } = Modal;

const Orders = () => {
  const [visibleModal, setVisibleModal] = useState("");
  const toggleVisibleModal = (modalName?: string) => {
    if (visibleModal !== "" && modalName) {
      setVisibleModal(modalName);
    }
    setVisibleModal("");
  };

  const [orderToAction, setOrderToAction] = useState<StoredOrder>();

  const { data, isLoading } = useQuery("ordersQuery", OrderService.get, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();
  const deleteOrderMutation = useMutation(
    "deleteOrderMutation",
    (OrderId: string) => OrderService.delete(OrderId),
    {
      onSuccess: () => {
        queryClient.setQueryData("ordersQuery", (oldData: StoredOrder[]) => {
          return oldData.filter((data) => data._id !== orderToAction._id);
        });
      },
    }
  );

  const toggleDeleteConfirm = (orderId: string) => {
    confirm({
      title: "Pense bem, deseja mesmo excluir este ingrediente ?",
      icon: <ExclamationCircleOutlined />,
      content: "Após excluido o Ingrediente não poderá ser recuperado!",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        deleteOrderMutation.mutate(orderId);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Goolps! - Pedidos</title>
      </Head>
      <NewOrderModal
        visible={visibleModal === "newOrderModal"}
        toggle={() => toggleVisibleModal("newOrderModal")}
      />
      {orderToAction && (
        <>
          <OrderDetailsModal
            order={orderToAction}
            visible={visibleModal === "detailOrder"}
            toggle={() => toggleVisibleModal("detailOrder")}
          />
          <EditOrderModal
            order={orderToAction}
            visible={visibleModal === "editIngredient"}
            toggle={() => toggleVisibleModal("editIngredient")}
          />
        </>
      )}
      <div className="flex justify-between">
        <Heading margin="none" size="small">
          Pedidos
        </Heading>
        <Button primary label="Novo Pedido" onClick={() => setVisibleModal("newOrderModal")} />
      </div>
      <Table className="mt-6" dataSource={data} loading={isLoading} rowKey="_id">
        <Column key="tableNumber" title="Mesa" dataIndex="tableNumber" />
        <Column key="totalPrice" title="Valor total" dataIndex="totalPrice" />
        <Column key="changeFor" title="Troco para" dataIndex="changeFor" />
        <Column
          key="paymentType"
          title="Forma de pagamento"
          dataIndex="paymentType"
          render={(text) => getPortPaymentType(text)}
        />
        <Column
          title="Ações"
          key="actions"
          render={(text, record: StoredOrder) => (
            <Space size="middle">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setOrderToAction(record);
                  setVisibleModal("detailOrder");
                }}
              >
                <Search />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setOrderToAction(record);
                  setVisibleModal("editIngredient");
                }}
              >
                <Edit />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setOrderToAction(record);
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

export default Orders;
