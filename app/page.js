"use client"
import { Cart } from "./components/Cart/Cart"
import Filter from "./components/Filter/Filter"
import Header from "./components/Header/Header"
import Products from "./components/Products/Products"
import WelcomeMsg from "./components/WelcomeMsg/WelcomeMsg"
import { useUserContext } from "./context/userContext"
import useFilter from "./hooks/useFilter"
import styles from "./page.module.css"
import { products } from "./data/data.json"

export default function Home() {
  const { isFirstLoad } = useUserContext()
  const { filterProducts, filter, setFilter } = useFilter()

  const filteredProds = filterProducts(products, filter)

  return (
    <>
      <Header />
      <Cart />

      <WelcomeMsg />

      {!isFirstLoad && (
        <main className={styles.main}>
          <Filter filter={filter} setFilter={setFilter} />

          <div className={styles.description}>
            <Products products={filteredProds} />
          </div>
        </main>
      )}
    </>
  )
}
