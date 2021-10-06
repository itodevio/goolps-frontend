import Modal from "components/Modal";
import Decimal from "decimal.js";
import { Button, Select, TextArea, TextInput } from "grommet";
import { FormClose } from "grommet-icons";
import { Order, StoredOrder, StoreOrderParam } from "interfaces/Order.interface";
import { StoredProduct } from "interfaces/Product.interface";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import OrderService from "services/Orders.service";
import { getTranslatedPaymentType } from "utils/order.utils";
import AddProductModal from "./AddProduct.modal";

interface NewOrderModalProps {
  visible: boolean;
  toggle: () => void;
}

const NewOrderModal: React.FC<NewOrderModalProps> = (props) => {
  const { visible, toggle } = props;
  const [addProductVisible, setAddProductVisible] = useState(false);
  const toggleAddProduct = () => setAddProductVisible(!addProductVisible);

  const [orderData, setOrderData] = useState<Order>();
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
      products: [],
      note: "",
      paymentType: "CASH",
      tableNumber: 0,
      totalPrice: 0,
      changeFor: 0,
    }));
    setOrderProducts([]);
  }, [visible]);

  const queryClient = useQueryClient();
  const newOrderMutation = useMutation(
    "newOrderMutation",
    (order: StoreOrderParam) => OrderService.store(order),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("ordersQuery", (oldData: StoredOrder[]) => {
          return [...oldData, data];
        });
      },
    }
  );

  const storeOrder = () => {
    const newOrder: StoreOrderParam = {
      ...orderData,
      products: orderProducts,
      paymentType: getTranslatedPaymentType(orderData.paymentType),
    };
    toast.promise(newOrderMutation.mutateAsync(newOrder), {
      loading: "Carregando...",
      success: "Pedido cadastrado com sucesso",
      error: "Erro ao cadastrar Pedido",
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
        onCancel={() => {
          toggle();
        }}
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
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Select
                  id="paymentType"
                  name="paymentType"
                  defaultValue="DINHEIRO"
                  options={[
                    "DINHEIRO",
                    "DEBITO",
                    "CREDITO",
                    "VALE ALIMENTAÇÃO",
                    "PIX",
                    "VALE REFEIÇÃO",
                  ]}
                  onChange={(e) => setOrderData((v) => ({ ...v, paymentType: e.target.value }))}
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
                />
              </div>
            </div>
            <div className="mt-4">
              <TextArea
                id="note"
                name="note"
                placeholder="Observações"
                onChange={(e) => setOrderData((v) => ({ ...v, note: e.target.value }))}
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
          <Button type="submit" primary label="CRIAR" onClick={storeOrder} />
        </div>
      </Modal>
    </>
  );
};

export default NewOrderModal;
