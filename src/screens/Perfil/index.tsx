//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DOS COMPONENTES
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ModalCart from '../../components/ModalCart';
import ModalUser from '../../components/ModalUser';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Perfil() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { user }:any = useContext(GlobalContext);

    return(
        <div className={`w-screen h-screen bg-my-gray font-inter max-w-[500px] mx-auto`}>
            <Header />
            <div className='w-full px-2 py-5'>
                <p>Nome do usuário: <span className={`font-bold`}>{user.name}</span></p>
                <p>Email do usuário: <span className={`font-bold`}>{user.email}</span></p>
                <p className={`font-bold`}>Histórico de compras do usuário:</p>
                
                {user.history.map((compra:any) => (
                    <div className={`flex flex-row items-center justify-between bg-[#b1b1b1] my-2 w-[90%] mx-auto p-2 rounded-[8px]`}>
                        <img src={compra.image} className={`w-[90px] h-[60px]`}/>
                        <img src={compra.estampa} className={`w-[90px] h-[60px]`}/>
                        <div className={`flex flex-col items-center justify-start gap-2`}>
                            <p className={`font-bold text-[18px] text-my-secondary`}>{compra.name}</p>
                            <p className={`font-bold text-[18px] text-my-primary`}>R$ {Number(Number(String(compra.price).replace(',', '.')) * compra.quantity).toFixed(2)} {compra.quantity}/un
                            </p>
                        </div>
                    </div>
                ))}

            </div>
            <Footer />
            <ModalCart />
            <ModalUser />
        </div>
    )
}