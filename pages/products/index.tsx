import { Table } from "antd";
import Column from "antd/lib/table/Column";
import { Heading } from "grommet";
import React from "react";
import { useQuery } from "react-query";

const Products = () => {
  // const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  // const toggleIngredientModal = () => setIngredientModalVisible(!ingredientModalVisible);

  // const { data, isLoading } = useQuery("ingredientsQuery", IngredientService.get, {
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });

  return (
    <>
      <div className="flex justify-between">
        <Heading margin="none" size="small">
          Produtos
        </Heading>
        {/* <Button primary label="Novo Ingrediente" onClick={toggleIngredientModal} /> */}
      </div>
      <Table className="mt-6">
        <Column key="name" title="Nome" dataIndex="name" />
        <Column key="qtt" title="Quantidade" dataIndex="qtt" />
        <Column key="unit" title="Unidade" dataIndex="unit" />
        <Column key="lotNumber" title="Número do Lote" dataIndex="lotNumber" />
      </Table>
    </>
  );
};

export default Products;
