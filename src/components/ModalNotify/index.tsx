//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DOS ICONES
import { FaBell } from "react-icons/fa"

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function ModalNotify() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { openNotifys, setOpenNotifys }:any = useContext(GlobalContext);

    return(
        <>
            {openNotifys == true && (
                <div
                    className={`w-screen h-screen fixed top-0 left-0 bg-[#00000085]`}
                    onClick={() => {
                        //MUDA O MODAL PARA FECHADO
                        setOpenNotifys(false)
                    }}
                >
                    <div
                        className={`bg-[#ffffff] w-[250px] h-[250px] absolute right-[6px] top-[36px] rounded-[12px] z-[60]`}
                        onClick={(e) => {
                            //EVITA A PROPAGAÇÃO DOS EVENTOS DE CLIQUE DOS BOTÕES
                            e.stopPropagation()
                        }}
                    >
                        <FaBell
                            onClick={() => {
                                setOpenNotifys(false)
                            }}
                            className={`absolute top-0 right-0 text-[28px] text-my-secondary mt-[13px] mr-[6px]`}
                        />
                    </div>
                </div>
            )}
        </>
    )
}