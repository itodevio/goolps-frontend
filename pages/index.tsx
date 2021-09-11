import Head from "next/head"
import { Tabs, Tab } from 'grommet';
import NewProduct from '../components/NewProduct/NewProduct';
import style from "./index.module.scss";

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Goolps - Produtos</title>
      </Head>

      <Tabs>
        <Tab title="PRODUTO">
          <div className={style.container}>
            <h1 style={{ fontSize: '2rem', margin: '3rem 0', fontWeight: 500 }}>Novo Produto</h1>
            <NewProduct ingredients={[{ id: 'sdoifjhg098dsfh9', name: 'Cebola' }]} />
          </div>
        </Tab>
        <Tab title="INGREDIENTE">

        </Tab>
      </Tabs>
    </div>
  )
}

export default IndexPage
