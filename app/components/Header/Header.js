"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./header.module.css"
import { useEffect, useState } from "react"
import { useUserContext } from "../../context/userContext"

function Header() {
  const { user } = useUserContext()
  return (
    <div className={styles.navUser}>
      {user && (
        <ul>
          <li className={styles.navUserCoins}>Saldo: ${user.money.toLocaleString()}</li>
        </ul>
      )}
    </div>
  )
}

export default Header
