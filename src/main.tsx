//IMPORTAÇÃO DAS BIBLIOTECAS
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

//IMPORTAÇÃO DO ESTILO GERAL
import './index.css'

//IMPORTAÇÃO DO COMPONENTE DE MODAL
import { ToastContainer } from 'react-toastify';

//IMPORTAÇÃO DO ESTILO DA BIBLIOTECA DE MODAL
import 'react-toastify/dist/ReactToastify.css';

//IMPORTAÇÃO DAS PÁGINAS
import Home from './screens/Home';
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Principal from './screens/Principal'
import Perfil from './screens/Perfil'
import Product from './screens/Product'
import CustomProduct from './screens/CustomProduct'
import EditProductCart from './screens/EditProductCart';

//IMPORTAÇÃP DO PROVEDOR DE ESTADOS GLOBAIS
import { GlobalProvider } from './provider/provider';

//CRIAÇÃO DAS ROTAS PÁGINAS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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
  {
    path: "cart/edit/:product",
    element: <EditProductCart />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </GlobalProvider>
  </StrictMode>,
)
