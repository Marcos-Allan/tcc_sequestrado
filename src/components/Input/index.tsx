//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'

//TIPAGEM DAS PROSPS DO COMPONENTE
interface Props {
    label: String,
    placeholder: String,
    validate: Boolean | undefined,
    type?: String,
}

//IMPORTAÇÃO DOS ICONES
import { FaEye, FaEyeSlash, FaCode, FaAd } from "react-icons/fa"

export default function Input(props: Props) {

    //UTILIZAÇÃO DO HOOK useState
    const [visible, setVisible] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR TROCAR O TIPO DO CAMPO DE TEXTO
    function togglePasswordType() {
        setVisible(!visible)
    }

    return(
        <div className='w-full'>
            <label className={`font-bold
            ${props.validate == true && 'text-my-primary'}
            ${props.validate == false && 'text-my-red'}
            ${props.validate == undefined && 'text-my-secondary'}
            `}>{props.label}</label>
            <div className='relative flex items-center justify-center'>
                <input
                    type={props.type ? `${visible == true ? 'text' : 'password'}` : 'text'}
                    className={`
                        px-3 py-5 w-full border-[1px] font-inter rounded-[12px] font-bold mt-2 mb-4 outline-none
                        ${props.validate == true && 'border-my-primary'}
                        ${props.validate == false && 'border-my-red'}
                        ${props.validate == undefined && 'border-my-gray'}

                        ${props.validate == true && 'text-my-primary'}
                        ${props.validate == false && 'text-my-red'}
                        ${props.validate == undefined && 'text-my-black'}

                        ${props.validate == true && 'placeholder:text-my-primary'}
                        ${props.validate == false && 'placeholder:text-my-red'}
                        ${props.validate == undefined && 'placeholder:text-my-gray'}

                        placeholder:font-bold
                        placeholder:font-inter
                    `}
                    name=""
                    id=""
                    placeholder={`${props.placeholder}`}
                />
                {props.type && (
                    <div
                        onClick={() => togglePasswordType()}
                        className={`absolute right-0 mr-4 text-[24px] text-my-gray`}
                    >
                        {visible == true ? (
                            <FaEye />
                        ):(
                            <FaEyeSlash />
                        )}
                    </div>
                )}

                {!props.type && props.validate == true && (
                    <div
                        className={`absolute right-0 mr-4 text-[24px] text-my-primary`}
                    >
                            <FaCode />
                    </div>
                )}
                
                {!props.type && props.validate !== true && (
                    <div
                        className={`absolute right-0 mr-4 text-[24px] text-my-red`}
                    >
                            <FaAd className='text-my-red'/>
                    </div>
                )}
            </div>
        </div>
    )
}