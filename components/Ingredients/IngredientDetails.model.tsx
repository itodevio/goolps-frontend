import { Descriptions } from "antd";
import Modal from "components/Modal";
import { Ingredient } from "interfaces/Ingredient";
import React from "react";

interface IngredientDetailsModalProps {
  ingredient: Ingredient;
  visible: boolean;
  toggle: () => void;
}

const IngredientDetailsModal: React.FC<IngredientDetailsModalProps> = (props) => {
  const { ingredient, visible, toggle } = props;
  return (
    <Modal title="Visualizar detalhes" visible={visible} width={1024} onCancel={toggle}>
      <Descriptions title={`Detalhes de ${ingredient.name}`}>
        <Descriptions.Item label="Nome">{ingredient.name}</Descriptions.Item>
        <Descriptions.Item label="Quantidade">{ingredient.qtt}</Descriptions.Item>
        <Descriptions.Item label="Unidade">{ingredient.unit}</Descriptions.Item>
        <Descriptions.Item label="Número do lote">{ingredient.lotNumber}</Descriptions.Item>
        <Descriptions.Item label="Descrição">{ingredient.description}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default IngredientDetailsModal;
