//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DOS COMPONENTES
import Footer from "../../components/Footer";
import Header from "../../components/Header";

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS ICONES
import { FaBatteryFull, FaBatteryEmpty, FaTshirt, FaPlus } from "react-icons/fa"

export default function CustomProduct() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelected }:any = useContext(GlobalContext);

    return(
        <div className={`w-screen h-screen flex flex-col items-center justify-start max-w-[500px] mx-auto`}>
            <Header />
            <div className={`bg-[#efefef] w-[95%] flex flex-col items-center justify-start rounded-[12px]`}>
                <h1 className={`mt-5 text-[20px] font-bold text-my-secondary`}>Vamos criar sua {productSelected.name}</h1>
                
                <div className={`mt-3 mb-5 w-[80%] h-[3px] bg-my-secondary`}></div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-between mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>estampa</h1>

                    <button className={`w-[47.5%] bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <p className={`text-[18px] font-bold text-my-secondary`}>sua estampa</p>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                    </button>
                    <button className={`w-[47.5%] bg-[#efefef] flex items-center flex-col justify-between ml-2 p-1 rounded-[8px]`}>
                        <p className={`text-[18px] font-bold text-my-secondary`}>estampa pré pronta</p>
                        <FaBatteryEmpty className={`text-my-secondary text-[48px]`}/>
                    </button>
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-center mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>tamanhos</h1>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>pp</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>p</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>m</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>g</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>gg</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px]`}>
                        <FaBatteryFull className={`text-my-secondary text-[48px]`}/>
                        <p className={`text-[18px] font-bold text-my-secondary uppercase`}>xg</p>
                    </button>
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-between mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>estampa</h1>

                    <button className={`w-[47.5%] bg-[#efefef] flex items-center flex-col justify-between mr-2 p-1 rounded-[8px] py-3`}>
                        <FaTshirt className={`text-my-secondary text-[48px] mb-3`}/>
                        <p className={`text-[18px] font-bold text-my-secondary`}>Branco <br/> Poliester</p>
                    </button>
                    <button className={`w-[47.5%] bg-[#efefef] flex items-center flex-col justify-between ml-2 p-1 rounded-[8px] py-3`}>
                        <FaTshirt className={`text-my-secondary text-[48px] mb-3`}/>
                        <p className={`text-[18px] font-bold text-my-secondary`}>Colorido <br/> Poliester</p>
                    </button>
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-center mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>tamanhos</h1>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <p className={`text-my-secondary text-center w-full font-bold text-[14px]`}>1 unidade</p>
                        <div className={`bg-my-secondary w-full h-[2px] my-2`}></div>
                        <p className={`text-[18px] font-bold text-my-primary uppercase`}>R${productSelected.price}</p>
                        <p className={`text-[12px] font-bold text-[#bcbcbc] uppercase`}>R${productSelected.price} / un</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <p className={`text-my-secondary text-center w-full font-bold text-[14px]`}>10 unidade</p>
                        <div className={`bg-my-secondary w-full h-[2px] my-2`}></div>
                        <p className={`text-[18px] font-bold text-my-primary uppercase`}>R${String(Number(Number(productSelected.price.replace(',','.')) * 10).toFixed(2)).replace('.',',')}</p>
                        <p className={`text-[12px] font-bold text-[#bcbcbc] uppercase`}>R${productSelected.price} / un</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <p className={`text-my-secondary text-center w-full font-bold text-[14px]`}>15 unidade</p>
                        <div className={`bg-my-secondary w-full h-[2px] my-2`}></div>
                        <p className={`text-[18px] font-bold text-my-primary uppercase`}>R${String(Number(Number(productSelected.price.replace(',','.')) * 15).toFixed(2)).replace('.',',')}</p>
                        <p className={`text-[12px] font-bold text-[#bcbcbc] uppercase`}>R${productSelected.price} / un</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <p className={`text-my-secondary text-center w-full font-bold text-[14px]`}>20 unidade</p>
                        <div className={`bg-my-secondary w-full h-[2px] my-2`}></div>
                        <p className={`text-[18px] font-bold text-my-primary uppercase`}>R${String(Number(Number(productSelected.price.replace(',','.')) * 20).toFixed(2)).replace('.',',')}</p>
                        <p className={`text-[12px] font-bold text-[#bcbcbc] uppercase`}>R${productSelected.price} / un</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <p className={`text-my-secondary text-center w-full font-bold text-[14px]`}>50 unidade</p>
                        <div className={`bg-my-secondary w-full h-[2px] my-2`}></div>
                        <p className={`text-[18px] font-bold text-my-primary uppercase`}>R${String(Number(Number(productSelected.price.replace(',','.')) * 50).toFixed(2)).replace('.',',')}</p>
                        <p className={`text-[12px] font-bold text-[#bcbcbc] uppercase`}>R${productSelected.price} / un</p>
                    </button>
                    <button className={`w-[30.8%] mb-2 bg-[#efefef] flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}>
                        <div className={`rounded-[50%] border-[2px] border-my-secondary p-2`}>
                            <FaPlus className={`text-my-secondary`} />
                        </div>
                        <p className={`font-bold text-[14px] text-my-secondary text-center`}>Adicionar quantidade</p>
                    </button>
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-start mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold text-my-secondary mb-4`}>Digite seu CEP</h1>
                    <input
                        type="number"
                        placeholder={`xxxxx-xxx`}
                        className={`border-none outline-none bg-[#efefef] rounded-[8px] pl-3 py-1`}
                    />
                </div>
            </div>
            <div className={`my-5 w-[90%] bg-[#efefef] p-4 font-bold rounded-[8px]`}>
                <p className={`text-my-secondary text-[24px]`}>Valor <span className={`text-my-primary`}>R$164,90</span></p>
            </div>
            <button className={`bg-[#b1b1b1] text-white py-3 rounded-[8px] w-[70%] mb-32 text-[20px] font-bold`}>
                Adicionar ao carrinho
            </button>
            <Footer />
        </div>
    )
}