import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Table, Modal, Space } from "antd";
import confirm from "antd/lib/modal/confirm";
import Column from "antd/lib/table/Column";
import { Button, Heading, Layer, Box } from "grommet";
import { StoredProduct } from "interfaces/Product.interface";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ProductService from "services/Product.service";
import NewProductForm from "components/Products/NewProduct";
import ProductDetailModal from "components/Products/ProductDetails.modal";
import IngredientService from "services/Ingredient.service";
import ProductCategoryService from "services/ProductCategorie.service";
import { StoredIngredient } from "interfaces/Ingredient";
import { StoredProductCategory } from "interfaces/ProductCategory.interface";
import { Edit, Trash, Search } from "grommet-icons";
import Head from "next/head";

interface Props {
  ingredients: StoredIngredient[];
  categories: StoredProductCategory[];
  products: StoredProduct[];
}

const Products = ({ ingredients, categories, products }) => {
  const [visibleModal, setVisibleModal] = useState("");

  const toggleVisibleModal = (modalName?: string) => {
    if (visibleModal !== "" && modalName) {
      setVisibleModal(modalName);
    }
    setVisibleModal("");
  };

  const [productToAction, setProductToAction] = useState<StoredProduct>(null);

  const { data, isLoading } = useQuery("productsQuery", ProductService.get, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(
    "deleteProductMutation",
    (productId: string) => ProductService.delete(productId),
    {
      onSuccess: () => {
        queryClient.setQueryData("productsQuery", (oldData: StoredProduct[]) => {
          return oldData.filter((data) => data._id !== productToAction._id);
        });
      },
    }
  );

  const toggleDeleteConfirm = (productId: string) => {
    confirm({
      title: "Pense bem, deseja mesmo excluir este produto?",
      icon: <ExclamationCircleOutlined />,
      content: "Após excluido o Produto não poderá ser recuperado!",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        deleteProductMutation.mutate(productId);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Goolps! - Produtos</title>
      </Head>
      {visibleModal === "newProduct" && (
        <Layer onClickOutside={() => setVisibleModal("")}>
          <Box pad="large" direction="column">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 500,
                lineHeight: "normal",
                marginBottom: "2rem",
              }}
            >
              Novo Produto
            </h1>
            <NewProductForm ingredients={ingredients} categories={categories} />
          </Box>
        </Layer>
      )}
      {visibleModal === "detailProduct" && (
        <Layer onClickOutside={() => setVisibleModal("")}>
          <Box pad="large" direction="column">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 500,
                lineHeight: "normal",
                marginBottom: "2rem",
              }}
            >
              Detalhes
            </h1>
            <ProductDetailModal product={productToAction} />
          </Box>
        </Layer>
      )}
      {visibleModal === "editProduct" && (
        <Layer onClickOutside={() => setVisibleModal("")}>
          <Box pad="large" direction="column">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 500,
                lineHeight: "normal",
                marginBottom: "2rem",
              }}
            >
              Editar Produto
            </h1>
            <NewProductForm
              ingredients={ingredients}
              categories={categories}
              product={productToAction}
              edit
            />
          </Box>
        </Layer>
      )}
      <div className="flex justify-between">
        <Heading margin="none" size="small">
          Produtos
        </Heading>
        <Button primary label="Novo Produto" onClick={() => setVisibleModal("newProduct")} />
      </div>
      <Table className="mt-6" dataSource={data} loading={isLoading}>
        <Column key="name" title="Nome" dataIndex="name" />
        <Column key="price" title="Preço" dataIndex="price" />
        <Column
          title="Categoria"
          key="category"
          render={(text, record: StoredProduct) => <span>{record.category.displayName}</span>}
        />
        <Column key="description" title="Descrição" dataIndex="description" />
        <Column
          title="Ações"
          key="actions"
          render={(text, record: StoredProduct) => (
            <Space size="middle">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setProductToAction(record);
                  setVisibleModal("detailProduct");
                }}
              >
                <Search />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setProductToAction(record);
                  setVisibleModal("editProduct");
                }}
              >
                <Edit />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setProductToAction(record);
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

export async function getServerSideProps() {
  const ingredients = await IngredientService.get();
  const categories = await ProductCategoryService.get();
  const products = await ProductService.get();

  return {
    props: {
      ingredients,
      categories,
      products,
    },
  };
}

export default Products;
