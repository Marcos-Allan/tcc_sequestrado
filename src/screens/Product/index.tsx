//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

//IMPORTAÇÃO DOS COMPONENTES
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import ModalUser from '../../components/ModalUser';
import ModalCart from '../../components/ModalCart';
import ModalLogout from '../../components/ModalLogout';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Product() {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelected, setProductSelected }:any = useContext(GlobalContext);

    //UTILIZAÇÃO DO HOOK useState
    const [products, setProducts] = useState<any>()
    const [productID, setProductID] = useState<number>(0)

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
    function getProducts() {
        axios.get('https://back-tcc-murilo.onrender.com/all-products')
        .then(function (response) {
            console.log(response.data)
            
            setProducts(response.data)

            console.log(response.data[0].type)
            console.log(response.data[0].colors[productID])
            console.log(response.data[0].prices[productID])
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR PEGAR O PRODUTO SELECIONADO
    function selectProduct(image:string, name:string, price:string, materials:any, material:string) {
        setProductSelected({ image: image, name:name, price:price, materials:materials, material:material })
        navigate(`/custom/${productSelected.name}`)
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
        getProducts()
    },[])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        console.log(productSelected.materials[1])
        //VERIFICA SE O PRODUTO FOI SELECIONADO
        if(productSelected.name == "undefined") {
            navigate('/principal')
        }
    },[])

    return(
        <div className={`w-screen min-h-screen flex flex-col items-center justify-start max-w-[500px] mx-auto bg-my-gray `}>
            <Header />
            <div className={`bg-my-white rounded-[16px] mt-5 flex items-center justify-center p-2 w-[80%] min-h-[400px]`}>
                {products && (
                    <img
                        src={products[0].img[productID]}
                        alt=""
                        className={`w-[330px]`}
                    />
                )}
            </div>
            
            <div className={`w-full flex flex-row justify-between overflow-scroll mt-3`}>
                {products && products.map((p:any) => (
                    <>
                        {p.type && p.type.map((sla:any, i:number) => (
                            <div
                                id={sla}
                                onClick={() => setProductID(i)}
                                className={`w-auto mx-3 bg-my-white min-w-[120px] text-[12px] flex flex-col items-center justify-center py-2 px-4 rounded-[4px] scrollbar scrollbar-none`}
                            >
                                <img
                                    src={p.img[i]}
                                    className={`w-[160px]`}
                                />
                            </div>
                        ))}
                    </>
                ))}
            </div>


            <p
                className={`mt-6 text-my-secondary font-inter capitalize font-bold text-[32px]`}
            >{productSelected.name}</p>
            <p className={`text-[20px] text-my-primary font-inter`}>a partir de </p>
            {products && (
                <p className={`text-[36px] text-my-primary font-inter font-bold`}>R$
                    <span className="text-[48px]">{String(Number(products[0].prices[productID])).split(',')[0]}</span>,
                    <span>{String(String(Number(products[0].prices[productID]).toFixed(2))).replace('.', ',').split(',')[1]}</span>
                </p>
            )}
            <button
                onClick={() => {
                    selectProduct(
                        products[0].img[productID],
                        `${productSelected.name}`,
                        `${String(Number(products[0].prices[productID]))}`,
                        {materiais: products[0].type, colors: products[0].colors[productID]},
                        products[0].type[productID]
                        )
                }}
                className={`mt-6 mb-2 text-my-white bg-my-primary w-[70%] rounded-[16px] py-4 text-[20px] font-inter font-bold`}
            >
                Personalize seu produto!
            </button>
            
            <h1 className={`w-[80%] text-my-secondary my-4 font-inter font-bold capitalize text-[24px]`}>descrição</h1>

            <div className={`flex flex-col items-start justify-start w-[80%] bg-my-white p-4 rounded-[8px] mb-8`}>
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
            <ModalLogout />
        </div>        
    )
}