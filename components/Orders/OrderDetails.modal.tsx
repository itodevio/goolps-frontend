import { Descriptions } from "antd";
import Modal from "components/Modal";
import { FormClose } from "grommet-icons";
import { StoredOrder } from "interfaces/Order.interface";
import React from "react";

interface OrderDetailsModalProps {
  order: StoredOrder;
  visible: boolean;
  toggle: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = (props) => {
  const { order, visible, toggle } = props;
  return (
    <Modal title="Visualizar detalhes" visible={visible} width={1024} onCancel={toggle}>
      <Descriptions title={`Detalhes do Pedido da mesa ${order.tableNumber}`}>
        <Descriptions.Item label="Mesa">{order.tableNumber}</Descriptions.Item>
        <Descriptions.Item label="Valor total">{order.totalPrice}</Descriptions.Item>
        <Descriptions.Item label="Troco">{order.changeFor}</Descriptions.Item>
        <Descriptions.Item label="Forma de pagamento">{order.paymentType}</Descriptions.Item>
        <Descriptions.Item label="Observação">{order.note}</Descriptions.Item>
        <Descriptions.Item label="Produtos">
          <ul>
            {order.products.map((product, index) => (
              <li key={index} className="flex justify-between">
                <span>
                  1x {product.name} - R$ {product.price}
                </span>
              </li>
            ))}
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default OrderDetailsModal;
