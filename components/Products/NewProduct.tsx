import { useState } from "react";
import {
  Layer,
  TextInput,
  Button,
  TextArea,
  Card,
  CardBody,
  CardHeader,
  Box,
  Menu,
} from "grommet";
import toast from 'react-hot-toast';
import { useMutation } from "react-query";
import { StoredIngredient } from "../../interfaces/Ingredient";
import { Product, StoredProduct } from "interfaces/Product.interface";
import style from "./NewProduct.module.scss";
import ProductService from "services/Product.service";
import { StoredProductCategory } from "interfaces/ProductCategory.interface";

interface MutationProps extends Product {
  _id: string
}

const NewProduct = ({ ingredients, categories, product, edit = false }: { ingredients: Array<StoredIngredient>, categories: Array<StoredProductCategory>, product?: StoredProduct, edit?: boolean }) => {
  const [value, setValue] = useState({
    name: product?.name ?? '',
    price: product?.price.toString() ?? '',
    category: product?.category?.displayName ?? '',
    ingredients: product?.ingredients.map(i => ({ ...i, quantity: 0 })) ?? [],
    description: product?.description ?? '',
  });
  const [modal, setModal] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const newProductMutation = useMutation('newProductMutation', (product: Product) => ProductService.store(product))
  const editProductMutation = useMutation('editProductMutation', (product: MutationProps) => ProductService.update(product))

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      toast.promise(editProductMutation.mutateAsync({
        ...value,
        price: parseFloat(value.price),
        _id: product._id
      }), {
        loading: 'Carregando...',
        success: 'Produto cadastrado com sucesso',
        error: 'Erro ao cadastrar Produto'
      })
    } else {
      toast.promise(newProductMutation.mutateAsync({
        ...value,
        price: parseFloat(value.price),
        ingredients: value.ingredients.map(i => ({ _id: i._id, quantity: i.quantity }))
      }), {
        loading: 'Carregando...',
        success: 'Produto cadastrado com sucesso',
        error: 'Erro ao cadastrar Produto'
      })
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <TextInput
          id="name"
          placeholder="Nome do produto"
          value={value.name}
          onChange={(e) => setValue((v) => ({ ...v, name: e.target.value }))}
        />

        <div className={style.inputSection}>
          <TextInput
            id="price"
            placeholder="Preço"
            value={value.price}
            type="number"
            onChange={(e) => setValue((v) => ({ ...v, price: e.target.value }))}
          />
          <TextInput
            id="category"
            placeholder="Categoria"
            value={value.category}
            suggestions={categories.map((c) => c.displayName)}
            onChange={(e) => setValue((v) => ({ ...v, category: e.target.value }))}
          />
          <Box className={style.flex2}>
            <Menu
              label="Ingredientes"
              items={ingredients.map((i) => {
                const find = value.ingredients.find((ig) => ig.name === i.name);
                return {
                  label: `${i.name}${find ? `- ${find.quantity}${find.unit}` : ""}`,
                  onClick: () => {
                    setQuantity(find ? find.quantity : 1);
                    setModal(i);
                  },
                };
              })}
            />
          </Box>
        </div>

        <TextArea
          id="description"
          placeholder="Descrição"
          value={value.description}
          className={style.textAreaField}
          onChange={(e) => setValue((v) => ({ ...v, description: e.target.value }))}
        />

        <Box justify="end">
          <Button
            alignSelf="end"
            className={style.createButton}
            type="submit"
            primary
            label={edit ? "EDITAR" : "CRIAR"}
          />
        </Box>
      </form>

      {!!modal && (
        <Layer>
          <Card gap="0.5rem" elevation="large">
            <CardHeader pad="small" justify="center">
              <h1>Quantidade</h1>
            </CardHeader>
            <CardBody pad={{ horizontal: "medium" }}>
              <form
                style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                onSubmit={(e) => {
                  e.preventDefault();

                  setValue((v) => {
                    const tempIngredients = [...v.ingredients];
                    const idx = tempIngredients.findIndex((i) => i.name === modal.name);

                    if (idx !== -1) {
                      tempIngredients[idx] = { ...tempIngredients[idx], quantity };
                    } else {
                      tempIngredients.push({
                        ...modal,
                        quantity,
                      });
                    }

                    return {
                      ...v,
                      ingredients: tempIngredients,
                    };
                  });
                  setModal(null);
                }}
              >
                <TextInput
                  placeholder="Quantidade"
                  value={quantity}
                  type="number"
                  size="small"
                  min={1}
                  max={modal.qtt}
                  onChange={(e) => setQuantity(parseFloat(e.target.value))}
                />
                <Box direction="row" pad={{ vertical: "small" }} gap="1.5rem">
                  <Button
                    secondary
                    color="dark-1"
                    label="Cancelar"
                    type="button"
                    onClick={() => setModal(null)}
                  />
                  <Button primary label="Salvar" type="submit" />
                </Box>
              </form>
            </CardBody>
          </Card>
        </Layer>
      )}
    </>
  );
};

export default NewProduct;
