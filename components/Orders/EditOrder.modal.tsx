import React, { useEffect, useState } from "react";
import { Button, Select, TextArea, TextInput } from "grommet";
import { StoredProduct } from "interfaces/Product.interface";
import AddProductModal from "./AddProduct.modal";
import { Order, StoredOrder, UpdateOrderParam } from "interfaces/Order.interface";
import Decimal from "decimal.js";
import { FormClose } from "grommet-icons";
import { useMutation, useQueryClient } from "react-query";
import OrderService from "services/Orders.service";
import toast from "react-hot-toast";
import { getPortPaymentType, getTranslatedPaymentType } from "utils/order.utils";
import Modal from "components/Modal";

interface EditOrderModalProps {
  order: StoredOrder;
  visible: boolean;
  toggle: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = (props) => {
  const { order, visible, toggle } = props;

  const [addProductVisible, setAddProductVisible] = useState(false);
  const toggleAddProduct = () => setAddProductVisible(!addProductVisible);

  const [orderData, setOrderData] = useState<Order>({
    products: [],
    note: "",
    paymentType: "CASH",
    tableNumber: 0,
    totalPrice: 0,
    changeFor: 0,
  });
  const [orderProducts, setOrderProducts] = useState<string[]>([]);

  const addProductToCart = (product: StoredProduct) => {
    setOrderData((oldData) => ({
      ...oldData,
      products: [...oldData.products, product],
      totalPrice: new Decimal(oldData.totalPrice).plus(product.price).toNumber(),
    }));
    setOrderProducts((oldData) => [...oldData, product._id]);
  };

  const removeProductFromCart = (product: StoredProduct) => {
    setOrderData((oldData) => ({
      ...oldData,
      products: oldData.products.filter((data) => data._id !== product._id),
      totalPrice: oldData.totalPrice - product.price,
    }));
    setOrderProducts((oldData) => oldData.filter((data) => data !== product._id));
  };

  useEffect(() => {
    setOrderData((oldData) => ({
      products: order.products,
      note: order.note,
      paymentType: order.paymentType,
      tableNumber: order.tableNumber,
      totalPrice: order.totalPrice,
      changeFor: order.changeFor,
    }));
    setOrderProducts(order.products.map((product) => product._id));
  }, [visible]);

  const queryClient = useQueryClient();
  const updateOrderMutation = useMutation(
    "updateOrderMutation",
    (order: UpdateOrderParam) => OrderService.update(order),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("ordersQuery", (oldData: StoredOrder[]) => {
          return oldData.map((oldData) => {
            if (oldData._id === data._id) return data;
            return oldData;
          });
        });
      },
    }
  );

  const updateOrder = () => {
    const updatedOrder: UpdateOrderParam = {
      _id: order._id,
      ...orderData,
      products: orderProducts,
      paymentType: getTranslatedPaymentType(orderData.paymentType),
    };
    toast.promise(updateOrderMutation.mutateAsync(updatedOrder), {
      loading: "Carregando...",
      success: "Pedido editado com sucesso",
      error: "Erro ao editar Pedido",
    });
    toggle();
  };

  return (
    <>
      <AddProductModal
        visible={addProductVisible}
        toggle={toggleAddProduct}
        addProductToCart={addProductToCart}
        removeProductFromCart={removeProductFromCart}
      />
      <Modal
        title="Criar novo Pedido"
        visible={visible}
        width={1124}
        destroyOnClose={true}
        onCancel={() => toggle()}
      >
        <div className="flex gap-8">
          <div className="flex-1">
            <div>
              <p>Mesa: {(orderData && orderData.tableNumber) || ""}</p>
              <p>Total a pagar (R$): {(orderData && orderData.totalPrice) || ""}</p>
              <p>Troco (R$): {(orderData && orderData.changeFor) || ""}</p>
            </div>
            <div className="mt-6">
              <TextInput
                id="tableNumber"
                name="tableNumber"
                placeholder="Número da mesa"
                type="number"
                onChange={(e) =>
                  setOrderData((v) => ({ ...v, tableNumber: parseInt(e.target.value) }))
                }
                value={orderData.tableNumber}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Select
                  id="paymentType"
                  name="paymentType"
                  options={[
                    "DINHEIRO",
                    "DEBITO",
                    "CREDITO",
                    "VALE ALIMENTAÇÃO",
                    "PIX",
                    "VALE REFEIÇÃO",
                  ]}
                  onChange={(e) => setOrderData((v) => ({ ...v, paymentType: e.target.value }))}
                  value={getPortPaymentType(orderData.paymentType)}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  id="changeFor"
                  name="changeFor"
                  placeholder="Troco"
                  type="number"
                  onChange={(e) =>
                    setOrderData((v) => ({ ...v, changeFor: parseInt(e.target.value) }))
                  }
                  value={orderData.changeFor}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextArea
                id="note"
                name="note"
                placeholder="Observações"
                onChange={(e) => setOrderData((v) => ({ ...v, note: e.target.value }))}
                value={orderData.note}
              />
            </div>
          </div>
          <div className="flex-1">
            <p>Produtos:</p>
            <ul className="mb-4">
              {orderData &&
                orderData.products.map((product, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      1x {product.name} - R$ {product.price}
                    </span>
                    <span className="cursor-pointer" onClick={() => removeProductFromCart(product)}>
                      <FormClose />
                    </span>
                  </li>
                ))}
            </ul>
            <Button primary label="Adicionar produto" onClick={toggleAddProduct} />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button secondary label="CANCELAR" onClick={toggle} />
          <Button type="submit" primary label="CRIAR" onClick={updateOrder} />
        </div>
      </Modal>
    </>
  );
};

export default EditOrderModal;
