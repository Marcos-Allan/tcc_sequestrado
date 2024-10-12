//IMPORTAÇÃO DAS BIBLIOTECAS
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

//IMPORTAÇÃO DO ESTILO GERAL
import './index.css'

//IMPORTAÇÃO DAS PÁGINAS
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Principal from './screens/Principal'
import Perfil from './screens/Perfil'
import Product from './screens/Product'
import CustomProduct from './screens/CustomProduct'

//IMPORTAÇÃP DO PROVEDOR DE ESTADOS GLOBAIS
import { GlobalProvider } from './provider/provider';

//CRIAÇÃO DAS ROTAS PÁGINAS
const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/principal",
    element: <Principal />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "product/:product",
    element: <Product />,
  },
  {
    path: "custom/:product",
    element: <CustomProduct />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>,
)
