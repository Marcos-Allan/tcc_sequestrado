//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import ModalUser from '../../components/ModalUser';
import ModalCart from '../../components/ModalCart';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Product() {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelected }:any = useContext(GlobalContext);

    return(
        <div className={`w-screen h-screen flex flex-col items-center justify-start max-w-[500px] mx-auto`}>
            <Header />
            <div className={`bg-[#efefef] rounded-[16px] flex items-center justify-center p-2 w-[80%] min-h-[400px]`}>
                <img
                    src={productSelected.image}
                    alt=""
                    className={`w-[330px]`}
                />
            </div>
            <p
                className={`mt-6 text-my-secondary font-inter capitalize font-bold text-[32px]`}
            >{productSelected.name}</p>
            <p className={`text-[20px] text-my-primary font-inter`}>a partir de </p>
            <p className={`text-[36px] text-my-primary font-inter font-bold`}>R$
                <span className="text-[48px]">{String(productSelected.price).split(',')[0]}</span>,
                <span>{String(productSelected.price).split(',')[1]}</span>
            </p>
            <button
                onClick={() => navigate(`/custom/${productSelected.name}`)}
                className={`mt-6 mb-2 text-my-white bg-my-primary w-[70%] rounded-[16px] py-4 text-[20px] font-inter font-bold`}
            >
                Personalize seu produto!
            </button>
            
            <h1 className={`w-[80%] text-my-secondary my-4 font-inter font-bold capitalize text-[24px]`}>descrição</h1>

            <div className={`flex flex-col items-start justify-start w-[80%] bg-[#efefef] p-4 rounded-[8px] mb-8`}>
                <p className={`mb-4`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam deserunt exercitationem ipsa doloremque voluptatibus cumque, autem sit quibusdam voluptate, necessitatibus repellendus quam totam. Iure enim, a veniam sapiente alias praesentium.
                </p>
                <h2 className={`font-inter font-bold text-my-secondary text-[18px]`}>Materiais</h2>
                <ul className={`list-disc list-inside`}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <h2 className={`font-inter font-bold text-my-secondary text-[18px]`}>Feitis</h2>
                <ul className={`list-disc list-inside`}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
            <Footer />
            <ModalUser />
            <ModalCart />
        </div>        
    )
}