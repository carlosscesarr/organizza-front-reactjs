/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Home', // name that appear in Sidebar
    exact: true
  },
  {
    path: '/app/categorias', // the url
    icon: 'CardsIcon', // the component being exported from icons/index.js
    name: 'Categorias', // name that appear in Sidebar
    exact: true
  },
  /*
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/app/404',
        name: '404',
      },
    ],
  },*/
]

export default routes
