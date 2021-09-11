import { useState } from 'react';
import { Layer, TextInput, Select, Button, TextArea, Card, CardBody, CardFooter, CardHeader, Box, Menu } from 'grommet';
import type { Ingredient } from '../../interfaces/Ingredient';
import style from './NewProduct.module.scss';

const NewProduct = ({ ingredients }: { ingredients: Array<Ingredient> }) => {
  const [value, setValue] = useState({
    name: '',
    price: '',
    category: '',
    ingredients: [],
    description: '',
  });
  const [modal, setModal] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = data => {

  }

  return (
    <>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <TextInput
          placeholder="Nome do produto"
          value={value.name}
          onChange={e => setValue(v => ({ ...v, name: e.target.value }))}
        />

        <div className={style.inputSection}>
          <TextInput
            placeholder="Preço"
            value={value.price}
            onChange={e => setValue(v => ({ ...v, price: e.target.value }))}
          />
          <TextInput
            placeholder="Categoria"
            value={value.category}
            onChange={e => setValue(v => ({ ...v, category: e.target.value }))}
          />
          <Box className={style.flex2}>
            <Menu
              label="Ingredientes"
              items={ingredients.map(i => ({
                label: i.name,
                onClick: () => {
                  setQuantity(1);
                  setModal(i)
                }
              }))}
            />
          </Box>
        </div>

        <TextArea
          placeholder="Descrição"
          value={value.description}
          className={style.textAreaField}
          onChange={e => setValue(v => ({ ...v, description: e.target.value }))}
        />

        <Box justify="end">
          <Button alignSelf="end" className={style.createButton} primary label="CRIAR" />
        </Box>
      </form>
      {
        !!modal &&
        <Layer>
          <Card gap="0.5rem" elevation="large">
            <CardHeader pad="small" justify="center" ><h1>Quantidade</h1></CardHeader>
            <CardBody pad={{ horizontal: "medium" }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} onSubmit={e => {
                e.preventDefault();
                setValue(v => ({ ...v, ingredients: [...v.ingredients, { ...modal, quantity: quantity }] }))
                setModal(null);
              }}>
                <TextInput
                  placeholder="Quantidade"
                  value={quantity}
                  type="number"
                  size="small"
                  min={1}
                  onChange={e => setQuantity(parseFloat(e.target.value))}
                />
                <Box direction="row" pad={{ vertical: "small" }} gap="1.5rem">
                  <Button secondary color="dark-1" label="Cancelar" type="button" onClick={() => setModal(null)} />
                  <Button primary label="Salvar" type="submit" />
                </Box>
              </form>
            </CardBody>
          </Card>
        </Layer>
      }
    </>
  )
}

export default NewProduct;