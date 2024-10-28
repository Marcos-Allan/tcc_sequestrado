//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS COMPONENTES
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ModalCart from '../../components/ModalCart';
import ModalUser from '../../components/ModalUser';
import ModalLogout from '../../components/ModalLogout';

//IMPORTAÇÃO DOS ICONES
import { CiEdit } from 'react-icons/ci';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Perfil() {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { user, setProductSelectedEdit }:any = useContext(GlobalContext);

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        console.log(user.logged)
        if(user.logged == false) {
            navigate('/sign-in')
        }
    },[user])

    return(
        <div className={`w-screen h-screen bg-my-gray font-inter max-w-[500px] mx-auto`}>
            <Header />
            <div className='w-full px-2 py-5'>
                <p>Nome do usuário: <span className={`font-bold`}>{user.name}</span></p>
                <p>Email do usuário: <span className={`font-bold`}>{user.email}</span></p>
                <p className={`font-bold`}>Histórico de compras do usuário:</p>
                
                {user.history.map((compra:any) => (
                    <div className={`flex flex-row items-center justify-between bg-[#b1b1b1] my-2 w-[90%] mx-auto p-2 rounded-[8px] relative`}>
                        <img src={compra.image} className={`w-[90px] h-[60px]`}/>
                        <img src={compra.estampa} className={`w-[90px] h-[60px]`}/>
                        <div className={`flex flex-col items-center justify-start gap-2`}>
                            <p className={`font-bold text-[18px] text-my-secondary`}>{compra.name}</p>
                            <p className={`font-bold text-[18px] text-my-primary`}>R$ {Number(Number(String(compra.price).replace(',', '.')) * compra.quantity).toFixed(2)} {compra.quantity}/un
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setProductSelectedEdit({
                                    id: compra.id,
                                    image: compra.image,
                                    name: compra.name,
                                    print: compra.estampa,
                                    size: compra.size ? compra.size : 'g' ,
                                    material: compra.material ? compra.material : 'poliester' ,
                                    quantity: compra.quantity,
                                    price: compra.price,
                                })

                                navigate(`/cart/edit/${compra.name}`)
                            }}
                            className={`bg-my-secondary w-10 h-10 flex items-center justify-center absolute top-[-20px] right-[-20px] rounded-[50%]`}
                        >
                            <CiEdit className={`text-[24px] text-my-white`} />
                        </div>
                    </div>
                ))}

            </div>
            <Footer />
            <ModalCart />
            <ModalUser />
            <ModalLogout />
        </div>
    )
}