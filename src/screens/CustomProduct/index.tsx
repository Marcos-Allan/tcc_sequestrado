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
import ModalLogout from '../../components/ModalLogout';
import ModalFinishBuy from '../../components/ModalFinishBuy';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";


//IMPORTAÇÃO DOS ICONES
import { AiFillPicture, AiFillFileImage } from "react-icons/ai"

//IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../utils/firebase';

export default function CustomProduct() {
    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    //UTILIZAÇÃO DO HOOKE DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelected, toggleUser, setCart, user }:any = useContext(GlobalContext);

    //UTILIZAÇÃO DO HOOK useState
    const [typeInd, setTypeInd] = useState<number>(0)
    const [arrayEstampas, setArrayEstampas] = useState<string[]>([])
    const [indPreEstampa, setIndPreEstampa] = useState<number>(0)

    //FUNÇÃO RESPONSÁVEL POR PEGAR O ÍNDICE DO PRODUTO
    useEffect(() => {
        if(productSelected.name == "Caneca"){
            setTypeInd(0)
        }else if(productSelected.name == "Camiseta"){
            setTypeInd(1)
        }else if(productSelected.name == "Almofada"){
            setTypeInd(2)
        }else if(productSelected.name == "Caderno"){
            setTypeInd(3)
        }else if(productSelected.name == "Agenda"){
            setTypeInd(4)
        }else if(productSelected.name == "Azulejo"){
            setTypeInd(5)
        }else if(productSelected.name == "Almochaveiro"){
            setTypeInd(6)
        }
    },[])

    //FUNÇÃO RESPONSÁVEL POR LISTAR OS AVATARES
    const fetchImages = async () => {
        //FAZ UMA REFERÊNCIA AO LOCAL DE AVATARES SALVOS NA NUVEM
        const storageRef = ref(storage, '/images/pre-estampas');
        // const storageRef = ref(storage, '/images/icons-achievements');

        try {
            //PEGA AS IMAGENS DENTRO DA PASTA ESPECIFICADA
            const result = await listAll(storageRef);

            //PEGA A URL DOS AVATARES
            const urlPromises = result.items.map((imageRef:any) => getDownloadURL(imageRef));
            
            //ESPERA TODOS OS AVATARES SEREM 
            const urls = await Promise.all(urlPromises);
            
            //COLOCA AS ESTAMPAS NO ARRAY DE ESTAMPAS
            setArrayEstampas(urls)
        } catch (error) {
            console.error('Erro ao listar imagens:', error);
        }
    };

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        if(user.logged == false) {
            navigate('/sign-in')
        }
    },[user])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        console.log(productSelected)

        //CHAMA A FUNÇÃO QUE PEGA AS IMAGENS DAS ESTAMPAS
        fetchImages()

        //VERIFICA SE TEM ITEM ESCOLHIDO
        if(productSelected.name == 'undefined') {
            //NAVEGA PARA A PÁGINA INICIAL
            navigate('/principal')
        }
    },[])


    //UTILIZA O HOOK useState
    const [size, setSize] = useState<string | undefined>('pp')
    const [color, setColor] = useState<string | undefined>('')
    const [print, setPrint] = useState<string | undefined>(undefined)
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
                setColor('white')
            break;
                
            case 'plástica':
                setProductID(1)
                setColor('white')
            break;
            
            case 'mágica':
                setProductID(2)
                setColor('red')
            break;
            
            case 'de colher':
                setProductID(3)
                setColor('white')
            break;
        
            default:
                break;
        }
    }

    //FUNÇÃO RESPONSÁVEL POR COLOCAR A COR DO PRIMEIRO ÍNDICE
    useEffect(() => {
        //VERIFICA SE JÁ TEM PRODUTOS CADASTRADOS
        if(products){
            setColor(products[typeInd].colors[productID][0])
        }
    },[productID])

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
    function getProducts() {
        getIndice()
        axios.get('https://back-tcc-murilo.onrender.com/all-products')
        .then(function (response) {
            
            //PEGA O PRODUTO
            setProducts(response.data)
            
            console.log(response.data[0].colors[productID])
            console.log(response.data[0].type[productID])
            console.log(response.data[0].prices[productID])
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO DEFINIU TODAS AS OPÇÕES
        if(size !== undefined && color !== undefined){
            //MUDA O ESTADO do btnActiv PARA true
            setBtnActive(true)
        }else{
            //MUDA O ESTADO do btnActiv PARA false
            setBtnActive(false)
        }
    },[size , color, print, img])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGAR OS PRODUTOS DO BACK-END
        getProducts()
    },[])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        console.log(productSelected.type)
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

                //GERA UM ID ALEATÓRIO
                const id = Math.floor(Math.random() * 99999)

                //FAZ A REQUISIÇÃO QUE ATUALIZA O HISTORICO DE PEDIDOS NO BANCO DE DADOS DO USUÁRIO
                axios.put('https://back-tcc-murilo.onrender.com/add-carrinho', {
                    userId: user.id,
                    produto: {
                        id: id,
                        image: productSelected.image,
                        name: productSelected.name,
                        price: Number(productSelected.prices),
                        quantity: productSelected.quantity,
                        estampa: imgURL,
                        size: size,
                        material: productSelected.material,
                        color: color,
                        colors: products[typeInd].colors[productID],
                        types: products[typeInd].type
                    }
                })
                .then(function (response) {
                    //ESCREVE NO CONSOLE O HISTORICO DE PEDIDOS DO CLIENTE
                    console.log(response.data)

                    toggleUser(user.id, user.name, user.email, user.history, response.data.cart, true)
                    setCart(response.data.cart)
                    // id:any, name:string, email:string, history:any, cart:any, logged:boolean)
                })
                .catch(function (error) {
                    console.log('erro: ', error)
                })
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
                                // addToCart({
                                //     id: id,
                                //     image: productSelected.image,
                                //     name: productSelected.name,
                                //     price: Number(productSelected.prices),
                                //     quantity: productSelected.quantity,
                                //     estampa: url,
                                //     size: size,
                                //     material: productSelected.material,
                                //     color: color,
                                //     colors: products[typeInd].colors[productID],
                                //     types: products[typeInd].type
                                // })

                                //FAZ A REQUISIÇÃO QUE ATUALIZA O HISTORICO DE PEDIDOS NO BANCO DE DADOS DO USUÁRIO
                                axios.put('https://back-tcc-murilo.onrender.com/add-carrinho', {
                                    userId: user.id,
                                    produto: {
                                        id: id,
                                        image: productSelected.image,
                                        name: productSelected.name,
                                        price: Number(productSelected.prices),
                                        quantity: productSelected.quantity,
                                        estampa: url,
                                        size: size,
                                        material: productSelected.material,
                                        color: color,
                                        colors: products[typeInd].colors[productID],
                                        types: products[typeInd].type
                                    }
                                })
                                .then(function (response) {
                                    //ESCREVE NO CONSOLE O HISTORICO DE PEDIDOS DO CLIENTE
                                    console.log(response.data)

                                    toggleUser(user.id, user.name, user.email, user.history, response.data.cart, true)
                                    setCart(response.data.cart)
                                    // id:any, name:string, email:string, history:any, cart:any, logged:boolean)
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

    //FUNÇÃO RESPONSÁVEL POR CHAMAR O MODAL
    const notifySucess = (message:string) => toast.success(message);

    return(
        <div className={`bg-my-gray w-screen h-screen flex flex-col items-center justify-start overflow-y-scroll overflow-x-hidden mx-auto scrollbar sm:px-0 scrollbar-thumb-my-secondary scrollbar-track-my-gray`}
        >
            <Header />
            <div className={`bg-my-gray w-[95%] flex flex-col items-center justify-start rounded-[12px] max-w-[900px]`}>
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
                            setImgURL(arrayEstampas[indPreEstampa])
                            setPrint('other')
                        }}
                        className={`w-[47.5%] bg-my-gray flex items-center flex-col justify-between ml-2 p-1 rounded-[8px] border-[1px] ${print == 'other' ? 'border-my-primary' : 'border-transparent'}`}
                    >
                        <p className={`text-[18px] font-bold text-my-secondary text-center`}>estampa pré pronta</p>
                        <AiFillFileImage className={`mt-2 text-my-secondary text-[48px]`}/>
                    </button>

                    {imgURL !== undefined && (
                        <div className={`w-full flex items-center justify-center my-4`}>
                            {print == 'other' && (
                                <p onClick={() => {
                                    if(indPreEstampa == 0){
                                        setIndPreEstampa(arrayEstampas.length - 1)
                                    }else{
                                        setIndPreEstampa(indPreEstampa - 1)
                                    }
                                    setImgURL(arrayEstampas[indPreEstampa])
                                }}>menos</p>
                                )}
                            <img src={imgURL} alt="" className={`w-[200px] h-[150px]`} />
                            {print == 'other' && (
                                <p onClick={() => {
                                    if(indPreEstampa == Number(arrayEstampas.length - 1)){
                                        setIndPreEstampa(0)
                                    }else{
                                        setIndPreEstampa(indPreEstampa + 1)
                                    }
                                    setImgURL(arrayEstampas[indPreEstampa])
                            }}>mais</p>
                            )}
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

                <div className={`w-[90%] flex flex-row flex-wrap bg-my-white p-3 rounded-[12px] justify-start gap-4 mb-5`}>
                    <h1 className={`w-full text-left text-[18px] font-bold capitalize text-my-secondary`}>Selecione a cor</h1>

                    {products && products[typeInd].colors[productID].map((materialColor:string) => (
                        <div
                            onClick={() => setColor(materialColor)}
                            style={{ backgroundColor: materialColor }}
                            className={`w-[60px] h-[60px] rounded-[6px] ${color == materialColor && 'scale-[1.2]'} border-[1px] border-my-black`}
                        >
                        </div>

                    ))}
                </div>
                
            </div>
            <div className={`my-5 w-[90%] bg-my-gray p-4 font-bold rounded-[8px] max-w-[900px]`}>
                {products && (
                    <p className={`text-my-secondary text-[24px]`}>Valor <span className={`text-my-primary`}>R${String(Number(Number(productSelected.prices.replace(',','.')) * productSelected.quantity).toFixed(2)).replace('.', ',')}</span></p>
                )}
            </div>
            <button
                onClick={() => {
                    //COLOCA O MODAL
                    notifySucess(`Item adicionado ao carrinho`)
                    
                    handleUpload()
                }}
                className={`${btnActive == true ? 'bg-my-primary' : 'bg-my-gray'} text-white py-3 rounded-[8px] w-[70%] mb-32 text-[20px] font-bold max-w-[900px]`}
            >
                Adicionar ao carrinho
            </button>
            <Footer />
            <ModalCart />
            <ModalUser />
            <ModalLogout />
            <ModalFinishBuy />
        </div>
    )
}