//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS ICONES
import { FaCartPlus } from "react-icons/fa"

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS ICONES
import { CiEdit } from 'react-icons/ci';

export default function ModalCart() {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { openCart, setOpenCart, cart, user, toggleUser, setCart, setProductSelectedEdit }:any = useContext(GlobalContext);

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREFGADA
    useEffect(() => {
        console.log(cart)
    },[cart])

    //FUNÇÃO RESPONSÁVEL POR FINALIZAR O PEDIDO
    function finishOrder() {
        axios.post('http://localhost:3000/finalizar-compra', {
            userId: user.id
        })
        .then(function (response) {
            console.log(response.data.historico_pedido)
            //COLOCA O HISTÓRICO DO PEDIDO NO FRONT-END DA APLICAÇÃO
            toggleUser(user.id, user.name, user.email, response.data.historico_pedido, true)
            
            //LIMPA O ARRAY DE CARRINHO
            setCart([])

            //COLOCA O ALERT DE SUCESSO NA TELA
            notifySucess('compra finalizada com sucesso')
        })
        .catch(function (error) {
            //COLOCA O ALERT DE SUCESSO NA TELA
            notifyError('compra finalizada com sucesso')

            //ESCREVE NO CONSOLE O ERRO
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR CHAMAR O MODAL
    const notifySucess = (message:string) => toast.success(message);
    const notifyError = (message:string) => toast.error(message);

    return(
        <>
            {openCart == true && (
                <div
                    className={`w-screen h-screen fixed top-0 left-0 bg-[#00000085]`}
                    onClick={() => {
                        //MUDA O MODAL PARA FECHADO
                        setOpenCart(false)
                    }}
                >
                    <div
                        className={`flex flex-col items-center justify-start pt-14 bg-[#ffffff] w-[300px] h-[250px] absolute right-[6px] top-[36px] rounded-[12px] z-[60]`}
                        onClick={(e) => {
                            //VERIFICA SE O MODAL ESTÁ ABERTO E FECHA ELE
                            e.stopPropagation()
                        }}
                    >
                        <FaCartPlus
                            onClick={() => {
                                setOpenCart(false)
                            }}
                            className={`absolute top-0 right-0 text-[28px] text-my-secondary mt-[13px] mr-[6px]`}
                        />

                        {cart.map((item:any) => (
                            <div className={`w-[92%] bg-[#efefef] h-[80px] rounded-[8px] flex flex-row items-center justify-between mb-4 relative px-3`}>
                                <div className={`absolute top-[-8px] left-[-8px] text-[12px] text-my-white bg-my-secondary rounded-[50%] w-[20px] text-center flex items-center justify-center h-[20px]`}>{item.quantity}</div>
                                <img src={item.estampa} alt="" className={`w-[70px]`} />
                                <div className={`flex-grow-[1] flex flex-row items-center justify-between`}>
                                    <img src={item.image} alt="" className={`w-[80px]`} />
                                    <div>
                                        <p className={`font-bold text-my-secondary text-[14px]`}>{item.name}</p>
                                        <p className={`font-bold text-my-primary text-[14px]`}>R${item.price} uni</p>
                                    </div>
                                    <div
                                        onClick={() => {
                                            console.log(cart)
                                            setProductSelectedEdit({
                                                id: cart.id,
                                                image: cart.image,
                                                name: cart.name,
                                                print: cart.estampa,
                                                size: cart.size ? cart.size : 'g' ,
                                                material: cart.material ? cart.material : 'poliester' ,
                                                quantity: cart.quantity,
                                                price: cart.price,
                                            })

                                            navigate(`/cart/edit/${cart.name}`)
                                        }}
                                        className={`bg-my-secondary w-10 h-10 flex items-center justify-center absolute top-[-20px] right-[-20px] rounded-[50%]`}
                                    >
                                        <CiEdit className={`text-[24px] text-my-white`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div
                            onClick={() => finishOrder()}
                            className={`bg-my-primary py-[6px] absolute bottom-0 mx-auto mb-1 w-[80%] text-center text-my-white rounded-[6px]`}
                        >Finalizar pedido</div>
                    </div>
                </div>
            )}
        </>
    )
}