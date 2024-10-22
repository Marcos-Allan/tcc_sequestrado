//IMPORTAÇÃO DAS BIBLIOTECAS
import { ChangeEvent, useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS COMPONENTES
import Input from "../../components/Input";
import GoogleLogin from "../../components/GoogleLogin";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import LoadingPage from '../../components/LoadingPage';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function SignIn() {
    //UTILIZAÇÃO DO HOOKE DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { toggleLoading, toggleUser }:any = useContext(GlobalContext);

    //UTILIZAÇÃO DO HOOK useState
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined)
    const [passwordValid, setPasswordValid] = useState<boolean | undefined>(undefined)
    
    const [btnValid, setBtnValid] = useState<boolean>(false)
    
    //FUNÇÃO RESPONSÁVEL POR CHAMAR O MODAL
    const notifySucess = (message:string) => toast.success(message);
    const notifyError = (message:string) => toast.error(message);

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function signIn() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        // axios.get(`https://tcc2-backend3.onrender.com/login/${email}`)
        axios.post(`http://localhost:3000/login`, {
            email: email,
            password: password,
        })
        .then(function (response) {
            //RETORNA A RESPOSTA DA REQUISIÇÃO PRO USUÁRIO
            console.log('rd'+response.data)

            //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
            toggleUser(response.data._id, response.data.name, response.data.email, response.data.historico_pedido)

            //MUDA O ESTADO DA APLICAÇÃO PARA false
            toggleLoading(false)

            if(typeof response.data === 'object'){
                //CHAMA O MODAL DE SUCESSO
                notifySucess(`Bem vindo novamente ${response.data.name}`)

                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/principal')
            }else{
                //CHAMA O MODAL DE ERRO
                notifyError(response.data)
            }

        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handleEmailInput(e:ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)

        //CHAMA A FUNÇÃO QUE VALIDA O INPUT
        validatEmailInput()
    }
    
    function handlePasswordInput(e:ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)

        //CHAMA A FUNÇÃO QUE VALIDA O INPUT
        validatPasswordInput()
    }

    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatEmailInput() {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoEmail = /^[\w._-]+@[\w._-]+\.[\w]{2,}/i

        //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
        if(padraoEmail.test(email) == true) {
            setEmailValid(true)
        }else{
            setEmailValid(false)
        }
    }
    
    function validatPasswordInput() {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^.{6,}$/

        //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
        if(padraoPassword.test(password) == true) {
            setPasswordValid(true)
        }else{
            setPasswordValid(undefined)
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(emailValid == true && passwordValid == true){
            setBtnValid(true)
        }else{
            setBtnValid(false)
        }
    },[emailValid, passwordValid])

    return(
        <div className={`w-screen h-screen bg-my-white px-10 flex flex-col max-w-[500px] mx-auto`}>
            <h1 className={`mt-5 text-[28px] text-my-secondary font-inter font-bold mb-2`}>Faça login com sua conta</h1>
            <p className={`font-inter text-my-gray font-bold text-[16px] mb-6`}>È bom ter você novamente!</p>
            
            <Input
                label={'Email'}
                placeholder={'Coloque seu endereço de email'}
                validate={emailValid}
                value={email}
                onChange={handleEmailInput}
            />
            
            <Input
                label={'Senha'}
                placeholder={'Coloque sua senha'}
                type={'password'}
                validate={passwordValid}
                value={password}
                onChange={handlePasswordInput}
            />

            <Button text={'Fazer login'} validate={btnValid} event={() => signIn()} />

            <Divider />

            <GoogleLogin />

            <p className={`text-center mt-20 font-bold text-my-secondary text-[18px]`}>
                Não tem uma conta ainda?
                <Link to={'/sign-up'} className={`ml-2 underline text-my-primary`}>
                    Cadastre-se
                </Link>
            </p>
            <LoadingPage />
        </div>
    )
}