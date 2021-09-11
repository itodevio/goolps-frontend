import Head from "next/head"
import { Tabs, Tab } from 'grommet';
import NewProduct from '../components/NewProduct';

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Goolps - Produtos</title>
      </Head>

      <Tabs>
        <Tab title="PRODUTO">
          <h1>Novo Produto</h1>
          <NewProduct ingredients={[{ id: 'sdoifjhg098dsfh9', name: 'Cebola' }]} />
        </Tab>
        <Tab title="INGREDIENTE">

        </Tab>
      </Tabs>
    </div>
  )
}

export default IndexPage
