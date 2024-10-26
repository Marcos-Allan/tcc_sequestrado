//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS COMPONENTES
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import ModalCart from '../../components/ModalCart';
import ModalUser from '../../components/ModalUser';
import ModalLogout from '../../components/ModalLogout';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function EditProductCart() {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelectedEdit }:any = useContext(GlobalContext);

    return(
        <div className={`w-screen h-screen bg-my-white font-inter max-w-[500px] mx-auto flex flex-col items-center justify-start`}>
            <Header />
            <div className={`p-3 w-[80%] bg-[#b1b1b1] flex items-center justify-center mt-4 rounded-[12px]`}>
                <img src={productSelectedEdit.image} />
            </div>
            <p className={`underline text-my-secondary font-bold text-[24px] my-4`}>{productSelectedEdit.name}</p>
            
            <div className={`w-[80%] flex flex-row justify-between mt-4`}>
                <div className={`w-[47%] bg-[#b1b1b1] p-3 rounded-[8px] flex flex-col`}>
                    <p className={`capitalize font-bold text-my-secondary text-center mb-1`}>estampa</p>
                    <img src={productSelectedEdit.print} alt="" />
                </div>
                <div className={`w-[47%] bg-[#b1b1b1] p-3 rounded-[8px] flex flex-col`}>
                    <p className={`capitalize font-bold text-my-secondary text-center mb-1`}>tamanho</p>
                    <p className={`text-center text-my-secondary text-[34px] uppercase font-bold`}>{productSelectedEdit.size}</p>
                </div>
            </div>

            <div className={`w-[80%] flex flex-row bg-[#b1b1b1] p-3 rounded-[6px] mt-3 items-center justify-between font-bold`}>
                <p className={`text-my-secondary font-bold capitalize text-[20px]`}>material</p>
                <p className='text-my-primary text-[18px]'>{productSelectedEdit.material}</p>
            </div>
            
            <div className={`w-[80%] flex flex-row bg-[#b1b1b1] p-3 rounded-[6px] mt-3 items-center justify-between font-bold`}>
                <p className={`text-my-secondary font-bold capitalize text-[20px]`}>quantidade</p>
                <p className='text-my-primary text-[18px]'>{productSelectedEdit.quantity}</p>
            </div>
            
            <div className={`w-[90%] flex flex-row bg-[#b1b1b1] p-3 rounded-[6px] mt-5 items-center justify-between font-bold`}>
                <p className={`text-my-secondary font-bold capitalize text-[22px]`}>valor</p>
                <p className='text-my-primary text-[20px]'>R$ {String(Number(Number(String(productSelectedEdit.price).replace(',', '.')) * Number(productSelectedEdit.quantity)).toFixed(2)).replace('.', ',')}</p>
            </div>

            <button
                onClick={() => {
                    navigate('/principal')
                }}
                className={`text-my-white font-bold bg-my-primary rounded-[8px] mt-5 text-[20px] px-5 py-2`}
            >Continuar comprando</button>
            <button
                onClick={() => {
                    navigate('/perfil')
                }}
                className={`text-my-white font-bold bg-my-secondary rounded-[8px] mt-3 mb-5 text-[18px] px-5 py-2`}
            >Voltar ao carrinho</button>

            <Footer />
            <ModalCart />
            <ModalUser />
            <ModalLogout />
        </div>
    )
}