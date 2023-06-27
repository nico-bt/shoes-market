"use client"
import "./filter.css"

function Filter({ filter, setFilter }) {
  return (
    <div className="filters-container">
      <div className="filters-btns-container">
        <button
          className={filter === "lowest" ? "filter-active" : ""}
          onClick={() => setFilter("lowest")}
        >
          Menor Precio
        </button>
        <button
          className={filter === "highest" ? "filter-active" : ""}
          onClick={() => setFilter("highest")}
        >
          Mayor Precio
        </button>
      </div>
    </div>
  )
}

export default Filter
