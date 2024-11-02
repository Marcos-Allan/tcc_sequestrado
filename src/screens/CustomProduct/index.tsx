//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS COMPONENTES
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ModalUser from '../../components/ModalUser';
import ModalCart from '../../components/ModalCart';
import ChoiceSizeCard from '../../components/ChoiceSizeCard';
import ChoiceQuantityCard from '../../components/ChoiceQuantityCard';
import ModalLogout from '../../components/ModalLogout';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS ICONES
import { FaTshirt, FaPlus } from "react-icons/fa"
import { AiFillPicture, AiFillFileImage } from "react-icons/ai"

//IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import ModalFinishBuy from '../../components/ModalFinishBuy';

export default function CustomProduct() {
    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    //UTILIZAÇÃO DO HOOKE DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelected, addToCart, user }:any = useContext(GlobalContext);

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE TEM ITEM ESCOLHIDO
        if(productSelected.name == 'undefined') {
            //NAVEGA PARA A PÁGINA INICIAL
            navigate('/principal')
        }
    },[])


    //UTILIZA O HOOK useState
    const [size, setSize] = useState<string | undefined>('pp')
    const [color, setColor] = useState<string | undefined>(undefined)
    const [material, setMaterial] = useState<string | undefined>(undefined)
    const [quantity, setQuantity] = useState<number>(1)
    const [print, setPrint] = useState<string | undefined>(undefined)
    const [modalQuantity, setModalQuantity] = useState<boolean>(false)
    const [btnActive, setBtnActive] = useState<boolean>(false)
    const [products, setProducts] = useState<any>()
    const [productID, setProductID] = useState<number>(0)
    const [img, setImg] = useState<string>('')
    const [imgURL, setImgURL] = useState<string | undefined>(undefined)

    //FUNÇÃO RESPONSÁEL POR PEGAR O INDICE DO PRODUTO
    function getIndice() {
        switch (productSelected.material) {
            case 'porcelana':
                setProductID(0)
            break;
            
            case 'plástica':
                setProductID(1)
            break;
            
            case 'mágica':
                setProductID(2)
            break;
            
            case 'de colher':
                setProductID(3)
            break;
        
            default:
                break;
        }
    }

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
    function getProducts() {
        getIndice()
        axios.get('https://back-tcc-murilo.onrender.com/all-products')
        .then(function (response) {
            
            //PEGA O PRODUTO
            setProducts(response.data)
            
            console.log(response.data[0].colors[productID])
            console.log(response.data[0].type[productID]) //type
            console.log(response.data[0].prices[productID]) //price
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO DEFINIU TODAS AS OPÇÕES
        if(size !== undefined && color !== undefined && quantity !== undefined){
            //MUDA O ESTADO do btnActiv PARA true
            setBtnActive(true)
        }else{
            //MUDA O ESTADO do btnActiv PARA false
            setBtnActive(false)
        }
    },[size , color, quantity, print, img])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
        getProducts()
    },[])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        console.log(productSelected.material)
        setMaterial(productSelected.material)
        //VERIFICA SE O PRODUTO FOI SELECIONADO
        if(productSelected.name == "undefined") {
            navigate('/principal')
        }
    },[])

    //FUNÇÃO RESPONSÁVEL POR PEGAR A IMAGEM DOS ARQUIVOS DO USUÁRIO
    const handleFileIMG = () => {

        //PEGA O ARQUIVO ESCOLHIDO
        const file = inputFileRef.current?.files?.[0]

        //VERIFICA SE TEM ARQUIVO
        if(file){
            //LÊ O ARQUIVO ESCOLHIDO
            const reader = new FileReader()

            //EXECUTA A FUNÇÃO ASSIM QUE O ARQUIVO É CARREGADO
            reader.onloadend = () => {
                //SETA AS IMAGENS COMO URL
                setImg(reader.result as string)
                
                //SETA AS IMAGENS COMO URL
                setImgURL(reader.result as string)
            }
            //LÊ A URL DO ARQUIVO
            reader.readAsDataURL(file)
        }
    }

     // FUNÇÃO RESPONSÁVEL POR DAR UPLOAD NA IMAGEM
     async function handleUpload() {
        //CRIA UMA PROMISSE 
        return new Promise((resolve, reject) => {
            //PEGA O ARQUIVO QUE FOI SELECIONADO
            const file = inputFileRef.current?.files?.[0];

            //VERIFICA SE NÃO TEM IMAGEM
            if (!file) {
                //RESOLVE A PROMEISSE PASSANDO A IMAGEM COMO PARÂMETRO
                resolve(img);
            } else {
                const storageRef = ref(storage, `images/estampas/${String(Math.floor(Math.random() * 99999999999999))}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    "state_changed",
                    (snapshot:any) => {
                        //PEGA A PORCENTAGEM DO UPLOAD DA IMAGEM
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress)
                    },
                    (error:any) => {
                        //DA UM ALERTA CASO OCORRA UM ERRO
                        alert(error);
                        
                        //FINALIZA A PROMISSE ABORTANDO E PASSANDO O ERRO OCORRIDO COMO PARÂMETRO
                        reject(error);
                    },
                    () => {
                        //PEGA A URL DA IMAGEM QUE FOI SALVA NO BANCO DE DADOS
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((url:any) => {
                                //SETA A URL DA IMAGEM
                                setImgURL(url);
                                
                                //ESCREVE A URL DA IMAGEM NO CONSOLE
                                console.log('imagem salva: '+ url)

                                //PEGA A URL DA IMAGEM
                                setImg(url);

                                //GERA UM ID ALEATÓRIO
                                const id = Math.floor(Math.random() * 99999)

                                //ADICIONA ITEM AO CARRINHO
                                addToCart({
                                    id: id,
                                    image: products[0].img[productID],
                                    name: productSelected && productSelected.name,
                                    price: products[0].prices[productID],
                                    quantity: quantity,
                                    estampa: url,
                                    size: size,
                                    material: material,
                                    color: color,
                                    colors: products[0].colors[productID],
                                    types: products[0].type
                                })

                                //FAZ A REQUISIÇÃO QUE ATUALIZA O HISTORICO DE PEDIDOS NO BANCO DE DADOS DO USUÁRIO
                                // axios.put('https://back-tcc-murilo.onrender.com/add-carrinho', {
                                axios.put('https://back-tcc-murilo.onrender.com/add-carrinho', {
                                    userId: user.id,
                                    produto: {
                                        id: id,
                                        image: products[0].img[productID],
                                        name: productSelected && productSelected.name,
                                        price: productSelected && productSelected.price,
                                        quantity: quantity,
                                        estampa: url,
                                        size: size,
                                        material: material,
                                        color: color,
                                        colors: products[0].colors[productID]
                                    }
                                })
                                .then(function (response) {
                                    //ESCREVE NO CONSOLE O HISTORICO DE PEDIDOS DO CLIENTE
                                    console.log(response.data)

                                    //ATUALIZA OS DADOS DO USUÁRIO NO FRONTEND
                                    // toggleUser(user.id, user.name, user.email, response.data.historico_pedido, true)
                                })
                                .catch(function (error) {
                                    console.log('erro: ', error)
                                })

                                //RESOLVE A PROMESSA PASSANDO A IMAGEM COMO PARÂMETRO
                                resolve(url);
                            })
                            .catch((error:any) => {
                                //DA UM ALERTA CASO OCORRA UM ERRO
                                alert(error);

                                //FINALIZA A PROMISSE ABORTANDO E PASSANDO O ERRO OCORRIDO COMO PARÂMETRO
                                reject(error);
                            });
                    }
                );
            }
        });
    }

    //FUNÇÃO RESPONSÁVEL POR SELECIONAR O TAMANHO
    function selectSize(choiceSize:string) {
        setSize(choiceSize)
    }
    
    //FUNÇÃO RESPONSÁVEL POR SELECIONAR A QUANTIDADE
    function selectQuantity(choiceQuantity:number) {
        setQuantity(choiceQuantity)
    }

    //FUNÇÃO RESPONSÁVEL POR CHAMAR O MODAL
    const notifySucess = (message:string) => toast.success(message);

    return(
        <div className={`w-screen h-screen flex flex-col items-center justify-start max-w-[500px] mx-auto`}>
            <Header />
            <div className={`bg-my-gray w-[95%] flex flex-col items-center justify-start rounded-[12px]`}>
                <h1 className={`mt-5 text-[20px] font-bold text-my-secondary`}>Vamos criar sua {productSelected && productSelected.name}</h1>
                
                <div className={`mt-3 mb-5 w-[80%] h-[3px] bg-my-secondary`}></div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-between mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>estampa</h1>

                    <label
                        onClick={() => setPrint('my')}
                        htmlFor="estampa"
                        className={`w-[47.5%] bg-my-gray flex items-center flex-col justify-between mr-2 p-1 rounded-[8px] border-[1px] ${print == 'my' ? 'border-my-primary' : 'border-transparent'}`}
                    >
                        <p className={`text-[18px] font-bold text-my-secondary text-center`}>escolha sua estampa</p>
                        <AiFillPicture className={`mt-2 text-my-secondary text-[48px]`}/>
                    </label>

                    <input ref={inputFileRef} type="file" name="estampa" id="estampa" className={`hidden`} onChange={handleFileIMG} />

                    <button
                        onClick={() => {
                            setImgURL('imagens')
                            setPrint('other')
                        }}
                        className={`w-[47.5%] bg-my-gray flex items-center flex-col justify-between ml-2 p-1 rounded-[8px] border-[1px] ${print == 'other' ? 'border-my-primary' : 'border-transparent'}`}
                    >
                        <p className={`text-[18px] font-bold text-my-secondary text-center`}>estampa pré pronta</p>
                        <AiFillFileImage className={`mt-2 text-my-secondary text-[48px]`}/>
                    </button>

                    {imgURL !== undefined && (
                        <div className={`w-full flex items-center justify-center my-4`}>
                            <img src={imgURL} alt="" className={`w-[200px] h-[150px]`} />
                        </div>
                    )}
                </div>

                {productSelected.name == 'Camiseta' && (
                    <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-center mb-5`}>
                        <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>tamanhos</h1>
                        <ChoiceSizeCard active={size == 'pp' ? true : false} size={'pp'} onClick={() => selectSize('pp')} />
                        <ChoiceSizeCard active={size == 'p' ? true : false} size={'p'} onClick={() => selectSize('p')} />
                        <ChoiceSizeCard active={size == 'm' ? true : false} size={'m'} onClick={() => selectSize('m')} />
                        <ChoiceSizeCard active={size == 'g' ? true : false} size={'g'} onClick={() => selectSize('g')} />
                        <ChoiceSizeCard active={size == 'gg' ? true : false} size={'gg'} onClick={() => selectSize('gg')} />
                        <ChoiceSizeCard active={size == 'xg' ? true : false} size={'xg'} onClick={() => selectSize('xg')} />
                    </div>
                )}

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-between mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>material</h1>
                    {productSelected && productSelected.materials.materiais.map((materialName:string, i:number) => (
                        <button
                            onClick={() => {
                                setMaterial(String(materialName))
                                setProductID(i)
                            }}
                            className={`w-[47.5%] flex-grow-[1] mb-2 bg-my-gray flex items-center flex-col justify-between mr-2 p-1 rounded-[8px] py-3 border-[1px] ${material == String(materialName) ? 'border-my-primary' : 'border-transparent'}`}
                        >
                            <FaTshirt className={`text-my-secondary text-[48px] mb-3`}/>
                            <p className={`text-[18px] font-bold text-my-secondary`}>{materialName}</p>
                        </button>
                    ))}
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-start gap-4 mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary`}>Selecione a cor</h1>

                    {products && products[0].colors[productID].map((materialColor:string) => (
                        <div
                            onClick={() => setColor(materialColor)}
                            style={{ backgroundColor: materialColor }}
                            className={`w-[60px] h-[60px] rounded-[6px] ${color == materialColor && 'scale-[1.2]'} border-[1px] border-my-black`}
                        >
                        </div>

                    ))}
                </div>

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-center mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary mb-4`}>tamanhos</h1>
                    {products && (
                        <>
                            <ChoiceQuantityCard
                                priceProductQuantity={String(products[0].prices[productID]).replace(',','.')}
                                priceProduct={String(products[0].prices[productID]).replace(',','.')}
                                quantity={1}
                                active={quantity == 1 ? true : false}
                                onClick={() => selectQuantity(1)}
                            />
                            <ChoiceQuantityCard 
                                priceProductQuantity={String(products[0].prices[productID]).replace(',','.')}
                                priceProduct={String(Number(Number(products[0].prices[productID].replace(',','.')) * 10).toFixed(2))}
                                quantity={10}
                                active={quantity == 10 ? true : false}
                                onClick={() => selectQuantity(10)}
                            />
                            <ChoiceQuantityCard
                                priceProductQuantity={String(products[0].prices[productID]).replace(',','.')}
                                priceProduct={String(Number(Number(products[0].prices[productID].replace(',','.')) * 15).toFixed(2))}
                                quantity={15}
                                active={quantity == 15 ? true : false}
                                onClick={() => selectQuantity(15)}
                            />
                            <ChoiceQuantityCard
                                priceProductQuantity={String(products[0].prices[productID]).replace(',','.')}
                                priceProduct={String(Number(Number(products[0].prices[productID].replace(',','.')) * 20).toFixed(2))}
                                quantity={20}
                                active={quantity == 20 ? true : false}
                                onClick={() => selectQuantity(20)}
                            />
                            <ChoiceQuantityCard
                                priceProductQuantity={String(products[0].prices[productID]).replace(',','.')}
                                priceProduct={String(Number(Number(products[0].prices[productID].replace(',','.')) * 50).toFixed(2))}
                                quantity={50}
                                active={quantity == 50 ? true : false}
                                onClick={() => selectQuantity(50)}
                            />
                        </>
                    )}
                    <button
                        onClick={() => {
                            setModalQuantity(true)
                        }}
                        className={`w-[30.8%] mb-2 bg-my-gray flex items-center flex-col justify-between mr-2 rounded-[8px] p-2`}
                    >
                        <div className={`rounded-[50%] border-[2px] border-my-secondary p-2`}>
                            <FaPlus className={`text-my-secondary`} />
                        </div>
                        <p className={`font-bold text-[14px] text-my-secondary text-center`}>Adicionar quantidade</p>
                    </button>
                </div>
            </div>
            <div className={`my-5 w-[90%] bg-my-gray p-4 font-bold rounded-[8px]`}>
                {products && (
                    <p className={`text-my-secondary text-[24px]`}>Valor <span className={`text-my-primary`}>R${String(Number(Number(products[0].prices[productID].replace(',','.')) * quantity).toFixed(2)).replace('.', ',')}</span></p>
                )}
            </div>
            <button
                onClick={() => {
                    //COLOCA O MODAL
                    notifySucess(`Item adicionado ao carrinho`)
                    
                    handleUpload()
                }}
                className={`${btnActive == true ? 'bg-my-primary' : 'bg-my-gray'} text-white py-3 rounded-[8px] w-[70%] mb-32 text-[20px] font-bold`}
            >
                Adicionar ao carrinho
            </button>
            <Footer />
            <ModalCart />
            <ModalUser />
            
            {modalQuantity == true && (
                <div className={`fixed top-0 left-0 w-screen h-screen bg-[#000000ac] flex items-center justify-center`}>
                    <div className={`flex flex-col max-w-[80%] w-[900px] bg-my-white rounded-[8px] p-5 justify-center items-center relative`}>
                        <h1 className={`w-full text-my-secondary text-center mb-3 text-[24px] font-bold`}>Escolha a quantidade</h1>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                if(Number(e.target.value) <= 0){
                                    setQuantity(1)
                                }else{
                                    setQuantity(Number(e.target.value))
                                }
                            }}
                            className={`text-[24px] outline-none w-full border-[1px] py-3 pl-2 border-my-secondary rounded-[6px] mb-2`}
                        />
                        <input
                            onClick={(e) => {
                                e.preventDefault()
                                setModalQuantity(false)  
                            }}
                            type="submit"
                            value="confirmar"
                            className={`border-none outline-none uppercase w-full py-4 text-[18px] bg-my-secondary rounded-[6px] text-my-white`}
                        />
                    </div>
                </div>
            )}
            <ModalLogout />
            <ModalFinishBuy />
        </div>
    )
}