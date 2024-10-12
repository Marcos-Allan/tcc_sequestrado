//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DOS ICONES
import { FaCartPlus } from "react-icons/fa"

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function ModalCart() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { openCart, setOpenCart }:any = useContext(GlobalContext);

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
                        className={`bg-[#ffffff] w-[250px] h-[250px] absolute right-[42px] top-[36px] rounded-[12px] z-[60]`}
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
                    </div>
                </div>
            )}
        </>
    )
}