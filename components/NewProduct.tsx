import { useState } from 'react';
import { Layer, TextInput, Select, Button, TextArea } from 'grommet';
import type { Ingredient, StoredIngredient } from "../interfaces/Ingredient";
import style from "./NewProduct.module.scss";

const NewProduct = ({ ingredients }: { ingredients: Array<StoredIngredient> }) => {
  const [value, setValue] = useState({
    name: "",
    price: "",
    category: "",
    ingredients: [],
    description: "",
  });
  const [modal, setModal] = useState(null);

  const handleSubmit = (data) => {};

  return (
    <>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <TextInput
          placeholder="Nome do produto"
          value={value.name}
          onChange={(e) => setValue((v) => ({ ...v, name: e.target.value }))}
        />

        <div className={style.inputSection}>
          <TextInput
            placeholder="Preço"
            value={value.price}
            onChange={(e) => setValue((v) => ({ ...v, price: e.target.value }))}
          />
          <TextInput
            placeholder="Categoria"
            value={value.category}
            onChange={(e) => setValue((v) => ({ ...v, category: e.target.value }))}
          />
          <div className={style.flex2}>
            <Select
              options={ingredients.map((i) => i.name)}
              value={value.ingredients}
              onChange={(props) => {
                console.log(props);
                // setValue(v => ({ ...v, ingredients: option }))
              }}
              multiple
              alignSelf="stretch"
            />
          </div>
        </div>
      </form>
      {!!modal && <Layer></Layer>}
    </>
  );
};

export default NewProduct;