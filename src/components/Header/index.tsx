//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DAS IMAGENS
import present from '../../../public/logosemtexto.png'
import presentText from '../../../public/TEXTO.png'

//IMPORTAÇÃO DOS ICONES
import { FaUser, FaCartPlus } from "react-icons/fa"

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Header() {
    //UTILIZAÇÃO DO HOOKE DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { openCart, setOpenCart, openPerfil, setOpenPerfil }:any = useContext(GlobalContext);

    return(
        <div className={`w-full bg-my-white flex items-center justify-between px-3 py-2`}>
            <div
                className={`flex items-center text-my-secondary`}
                onClick={() => navigate('/principal')}
            >
                <img
                    src={present}
                    alt=""
                    className={`w-[60px]`}
                />
                <img
                    src={presentText}
                    alt=""
                    className={`w-[110px]`}
                />
                {/* <p className={`ml-3 font-bold font-inter`}>Presente <br />urgente</p> */}
            </div>
            <div className={`flex items-center gap-2 text-[28px] text-my-secondary`}>
                <FaUser
                    onClick={() => {
                        setOpenPerfil(!openPerfil)
                    }}
                />
                <FaCartPlus
                    onClick={() => {
                        setOpenCart(!openCart)
                    }}
                />
            </div>
        </div>
    )
}