//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DOS COMPONENTES
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ModalCart from '../../components/ModalCart';
import ModalNotify from '../../components/ModalNotify';
import ModalUser from '../../components/ModalUser';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Perfil() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { user }:any = useContext(GlobalContext);

    return(
        <div className={`w-screen h-screen bg-my-gray font-inter max-w-[500px] mx-auto`}>
            <Header />
            <div className='w-full h-[33.9%] px-2 py-5'>
                <p>Nome do usuário: <span className={`font-bold`}>{user.name}</span></p>
                <p>Email do usuário: <span className={`font-bold`}>{user.email}</span></p>
                <p className={`font-bold`}>Histórico de compras do usuário:</p>
                {user.history.map((compra:any) => (
                    <p>{compra.name}, {compra.data}, {compra.img}, R$ {Number(compra.price * compra.quantity).toFixed(2)}</p>
                ))}
            </div>
            <Footer />
            <ModalCart />
            <ModalNotify />
            <ModalUser />
        </div>
    )
}