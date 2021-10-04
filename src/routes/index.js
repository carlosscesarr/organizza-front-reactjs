import { lazy } from 'react'
//import Home from '../pages/Home'
const Home = lazy(() => import("../pages/Home"))
const Categorias = lazy(() => import("../pages/Categorias"))
const CategoriasAdd = lazy(() => import("../pages/CategoriasAdd"))
const CategoriasEdit = lazy(() => import("../pages/CategoriasEdit"))
const Graficos = lazy(() => import("../pages/Graficos"))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/', // the url
    component: Home, // view rendered
    privateRoute: true
  },
  {
    path: '/categorias', // the url
    component: Categorias, // view rendered
    privateRoute: true
  },
  {
    path: '/categorias/add', // the url
    component: CategoriasAdd, // view rendered
    privateRoute: true
  },
  {
    path: '/categorias/:id/editar', // the url
    component: CategoriasEdit, // view rendered
    privateRoute: true
  },
  {
    path: '/graficos', // the url
    component: Graficos, // view rendered
    privateRoute: true
  },
]

export default routes
