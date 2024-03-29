import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './navigation.module.scss'

export default function Navigation() {
  return (
    <nav className={styles.wrapper}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.active]: isActive })}>
            출발
          </NavLink>
        </li>
        <li>
          <NavLink to='arrive' className={({ isActive }) => cx({ [styles.active]: isActive })}>
            도착
          </NavLink>
        </li>
        <li>
          <NavLink to='airport' className={({ isActive }) => cx({ [styles.active]: isActive })}>
            공항
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
