import React from "react";
import Modal from "components/Modal";
import { List, Skeleton } from "antd";
import { useQuery } from "react-query";
import ProductService from "services/Product.service";
import { Button } from "grommet";
import { StoredProduct } from "interfaces/Product.interface";

interface AddProductModalProps {
  visible: boolean;
  toggle: () => void;
  addProductToCart: (product: StoredProduct) => void;
  removeProductFromCart: (product: StoredProduct) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = (props) => {
  const { visible, toggle, addProductToCart, removeProductFromCart } = props;

  const { data, isLoading } = useQuery("productsQuery", ProductService.get, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <Modal
      title="Adicionar Produto ao pedido"
      visible={visible}
      width={1124}
      onCancel={toggle}
      destroyOnClose={true}
    >
      <List
        className="demo-loadmore-list"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                primary
                label="Adicionar ao carrinho"
                onClick={() => {
                  addProductToCart(item);
                  toggle();
                }}
              />,
            ]}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={`Categoria: ${item.category.displayName} - Preço: ${item.price}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AddProductModal;
