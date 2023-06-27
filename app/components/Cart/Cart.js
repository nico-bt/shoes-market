"use client"
import { useUserContext } from "../../context/userContext"
import { AddToCartIcon, CartIcon, ClearCartIcon, RemoveFromCartIcon } from "../Icons"
import styles from "./cart.module.css"

import { useId, useState } from "react"
// import { useCartContext } from "../../hooks/useCartContext"

function CartItem({ title, thumbnail, price, quantity, removeItem, redeemItem }) {
  const { user } = useUserContext()
  return (
    <li>
      <img src={thumbnail} alt={title} />

      <footer>
        <strong>
          {title} - $ {price}
        </strong>
        <div>
          <small>Cantidad: {quantity} </small>

          {user.money - price > 0 && (
            <button onClick={redeemItem}>
              <AddToCartIcon />
            </button>
          )}

          <button onClick={removeItem}>
            <RemoveFromCartIcon />
          </button>
        </div>
      </footer>
    </li>
  )
}

export function Cart() {
  const { user, removeItem, redeemItem } = useUserContext()
  const cartCheckboxId = useId()
  const [showTooltip, setShowToolTip] = useState(false)

  const totalItems = user.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <label className={styles.cartButton} htmlFor={cartCheckboxId}>
        {totalItems > 0 && <span className={styles.totalItems}> {totalItems} </span>}
        <span>Carrito</span>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className={styles.cart}>
        <ul>
          {user.cart?.length > 0 ? (
            user.cart.map((product) => (
              <CartItem
                key={product.id}
                {...product}
                removeItem={() => removeItem(product)}
                redeemItem={() => redeemItem(product)}
              />
            ))
          ) : (
            <div className={styles.emptyCart}> 🛒 Carrito Vacío</div>
          )}
        </ul>

        {user.cart?.length > 0 && (
          <footer>
            <button
              onClick={() => {
                user.cart.forEach((item) => {
                  removeItem(item)
                })
                setShowToolTip(false)
              }}
              onMouseEnter={() => setShowToolTip(true)}
              onMouseLeave={() => setShowToolTip(false)}
            >
              <ClearCartIcon />
              {showTooltip && <span className={styles.toolTipDiscardAll}>Vaciar Carrito</span>}
            </button>
          </footer>
        )}
      </aside>
    </>
  )
}
