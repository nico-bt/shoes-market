"use client"
import { useState } from "react"

function useFilter() {
  const [filter, setFilter] = useState("default")

  const filterProducts = (products, filter) => {
    let filteredProducts = [...products]

    if (filter === "lowest") {
      filteredProducts.sort((a, b) => a.price - b.price)
    }

    if (filter === "highest") {
      filteredProducts.sort((a, b) => b.price - a.price)
    }

    return filteredProducts
  }

  return { filterProducts, filter, setFilter }
}

export default useFilter
