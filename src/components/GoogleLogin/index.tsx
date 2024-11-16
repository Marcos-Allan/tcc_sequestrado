//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DAS IMAGENS
import image from '../../../public/google.png'

//IMPORTAÇÃO DOS SERVIÇOS DO FIREBASE
import { auth, provider, signInWithPopup } from '../../utils/firebase.tsx'

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function GoogleLogin() {
    //UTILIZAÇÃO DO HOOKE DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { toggleLoading, toggleUser }:any = useContext(GlobalContext);

    //FUNÇÃO RESPONSÁVEL POR FAZER LOGIN
    function signIn(email:string, name:string) {
        axios.post('https://back-tcc-murilo.onrender.com/register-google', {
            email: email,
            name: name,
        })
        .then(function (response) {
            
            if(typeof response.data === 'object'){
                //CHAMA O MODAL DE SUCESSO
                notifySucess(`${response.data.message} ${response.data.person.name}`)

                //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
                toggleUser(response.data.person._id, response.data.person.name, response.data.person.email, response.data.person.historico_pedido, response.data.person.cart, true)

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

    //FUNÇÃO RESPONSÁVEL POR CHAMAR O MODAL
    const notifySucess = (message:string) => toast.success(message);
    const notifyError = (message:string) => toast.error(message);

    //FUNÇÃO REPOSNSÁVEL POR FAZER LOGIN COM O GOOGLE
    const handleGoogleLogin = async () => {
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA true
        toggleLoading(true)

        try {
            //REALIZA O LOGIN VIA POPUP DO GOOGLE
            const result = await signInWithPopup(auth, provider);
            
            // FAZ LOGIN COM A CONTA DO USÁRIO
            if(result.user){
                //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
                toggleLoading(false)
                signIn(result.user.email || "", result.user.displayName || "")
                console.log(result.user)
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return(
        <div
            onClick={() => handleGoogleLogin()}
            className={`w-full max-w-[700px] border-[1px] border-my-gray py-3 rounded-[12px] flex items-center justify-center mt-8 cursor-pointer`}
        >
            <img
                src={image}
                className="w-[36px]"
            />
            <p className="font-inter font-bold ml-2 text-[18px]">Fazer login com o google</p>
        </div>
    )
}