import Header from "./components/Header"
import Products from "./components/Products"
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Shoe Market</h1>
          <Products />
        </div>
      </main>
    </>
  )
}
