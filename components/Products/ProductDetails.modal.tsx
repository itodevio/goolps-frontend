import { Descriptions } from "antd";
import { FormClose } from "grommet-icons";
import { StoredProduct } from "interfaces/Product.interface";
import React from "react";

interface ProductDetailsProps {
  product: StoredProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
  const { product } = props;
  return (
    <Descriptions title={`Detalhes do Produto ${product.name}`}>
      <Descriptions.Item label="Preço">{product.price}</Descriptions.Item>
      <Descriptions.Item label="Categoria">{product.category.displayName}</Descriptions.Item>
      <br />
      <Descriptions.Item>
        <span>Ingredientes:</span>
      </Descriptions.Item>
      <Descriptions.Item>
        <ul>
          {product.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProductDetails;
