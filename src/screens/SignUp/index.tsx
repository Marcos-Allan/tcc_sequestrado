//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'
import { Link } from "react-router-dom";

//IMPORTAÇÃO DOS COMPONENTES
import Input from "../../components/Input";
import GoogleLogin from "../../components/GoogleLogin";
import Button from "../../components/Button";
import Divider from "../../components/Divider";

export default function SignUp() {

    //UTILIZAÇÃO DO HOOK useState
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const [nameValid, setNameValid] = useState<boolean>(true)
    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [passwordValid, setPasswordValid] = useState<boolean | undefined>(undefined)
    
    const [btnValid, setBtnValid] = useState<boolean>(false)

    return(
        <div className={`w-screen h-screen bg-my-white px-10 flex flex-col max-w-[500px] mx-auto`}>
            <h1 className={`mt-5 text-[28px] text-my-secondary font-inter font-bold mb-2`}>Crie sua conta</h1>
            <p className={`font-inter text-my-gray font-bold text-[16px] mb-6`}>Vamos criar sua conta</p>

            <Input
                label={'Nome completo'}
                placeholder={'Coloque seu nome completo'}
                validate={nameValid}
            />
            
            <Input
                label={'Email'}
                placeholder={'Coloque seu endereço de email'}
                validate={emailValid}
                />
            
            <Input
                label={'Senha'}
                placeholder={'Coloque sua senha'}
                type={'password'}
                validate={passwordValid}
            />

            <p className={`text-my-black text-left font-bold font-inter text-[14px]`}>Ao cadastrar-se você está concordando com nossos <span className={`text-my-primary underline font-inter`}>Termos, Privacidade, Política</span> e uso de Cookies</p>

            <Button text={'Crie sua conta'} validate={btnValid} />

            <Divider />

            <GoogleLogin />

            <p className={`text-center mt-20 font-bold text-my-secondary text-[20px]`}>
                Já tem uma conta?
                <Link to={'/sign-up'} className={`ml-2 underline text-my-primary`}>
                    Entre
                </Link>
            </p>
        </div>
    )
}