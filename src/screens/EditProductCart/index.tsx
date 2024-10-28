//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//IMPORTAÇÃO DOS COMPONENTES
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import ModalCart from '../../components/ModalCart';
import ModalUser from '../../components/ModalUser';
import ModalLogout from '../../components/ModalLogout';
import LoadingPage from '../../components/LoadingPage';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';

export default function EditProductCart() {
    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO DO react-router-dom
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { productSelectedEdit, updateItemsCart, user, toggleUser, toggleLoading }:any = useContext(GlobalContext);

    //VARIÁVEIS IMUTÁVEIS
    const myImg:any = productSelectedEdit.image
    const myName:any = productSelectedEdit.name
    const myPrice:any = productSelectedEdit.price

    //UTILIZAÇÃO DO HOOK useState
    const [myEstampa, setMyEstampa] = useState<any>(productSelectedEdit.print)
    const [myMaterial, setMyMaterial] = useState<any>(productSelectedEdit.material)
    const [myQuantity, setMyQuantity] = useState<any>(productSelectedEdit.quantity)
    const [mySize, setMySize] = useState<any>(productSelectedEdit.size)

    //ARRAY DE POSSIBILIDADES DAS PROPS DO PRODUTOS
    const sizes = ['pp', 'p', 'm', 'g', 'gg', 'xg']
    const materiais = ['poliester', 'algodão', 'veludo', 'sarja']

    //UTILIZA O HOOK useState
    const [img, setImg] = useState<string>('')

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE O PRODUTO FOI SELECIONADO
        if(productSelectedEdit.name == "undefined") {
            navigate('/principal')
        }
    },[])

    const handleSize = () => {
        // Obtém o índice atual da escolha
        const currentIndex = sizes.indexOf(mySize)
        
        // Calcula o próximo índice (volta ao início se for o último)
        const nextIndex = (currentIndex + 1) % sizes.length
        
        // Atualiza o estado com o próximo valor de escolha
        setMySize(sizes[nextIndex])
    }
    
    const handleMaterial = () => {
        // Obtém o índice atual da escolha
        const currentIndex = materiais.indexOf(myMaterial)
        
        // Calcula o próximo índice (volta ao início se for o último)
        const nextIndex = (currentIndex + 1) % materiais.length
        
        // Atualiza o estado com o próximo valor de escolha
        setMyMaterial(materiais[nextIndex])
    }

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
                setMyEstampa(reader.result as string)
            }
            //LÊ A URL DO ARQUIVO
            reader.readAsDataURL(file)
        }
    }

    // FUNÇÃO RESPONSÁVEL POR DAR UPLOAD NA IMAGEM
    async function handleUpload() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //CRIA UMA PROMISSE 
        return new Promise((resolve, reject) => {
            //PEGA O ARQUIVO QUE FOI SELECIONADO
            const file = inputFileRef.current?.files?.[0];

            //VERIFICA SE NÃO TEM IMAGEM
            if (!file) {
                //RESOLVE A PROMEISSE PASSANDO A IMAGEM COMO PARÂMETRO
                resolve(img);

                //FAZ A REQUISIÇÃO QUE ATUALIZA O HISTORICO DE PEDIDOS NO BANCO DE DADOS DO USUÁRIO
                axios.put('https://back-tcc-murilo.onrender.com/update-historico', {
                    userId: user.id,
                    pedidoId: productSelectedEdit.id,
                    novosDados: {
                        image: myImg,
                        name: myName,
                        price: myPrice,
                        quantity: myQuantity,
                        estampa: myEstampa,
                        size: mySize,
                        material: myMaterial,
                    }
                })
                .then(function (response) {
                    //ESCREVE NO CONSOLE O HISTORICO DE PEDIDOS DO CLIENTE
                    console.log(response.data.historico_pedido)

                    //MUDA O ESTADO DA APLICAÇÃO PARA true
                    toggleLoading(true)

                    //ATUALIZA OS DADOS DO USUÁRIO NO FRONTEND
                    toggleUser(user.id, user.name, user.email, response.data.historico_pedido, true)

                    //NAVEGA PARA A PÁGINA DE PERFIL
                    navigate('/perfil')
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
                                setMyEstampa(url);
                                
                                //ESCREVE A URL DA IMAGEM NO CONSOLE
                                console.log('imagem salva: '+ url)

                                //PEGA A URL DA IMAGEM
                                setImg(url);

                                //FAZ A REQUISIÇÃO QUE ATUALIZA O HISTORICO DE PEDIDOS NO BANCO DE DADOS DO USUÁRIO
                                axios.put('https://back-tcc-murilo.onrender.com/update-historico', {
                                    userId: user.id,
                                    pedidoId: productSelectedEdit.id,
                                    novosDados: {
                                        image: myImg,
                                        name: myName,
                                        price: myPrice,
                                        quantity: myQuantity,
                                        estampa: url,
                                        size: mySize,
                                        material: myMaterial,
                                    }
                                })
                                .then(function (response) {
                                    //ESCREVE NO CONSOLE O HISTORICO DE PEDIDOS DO CLIENTE
                                    console.log('aaaaaaaaaaaaaaa: '+response.data.historico_pedido)

                                    //ATUALIZA OS DADOS DO USUÁRIO NO FRONTEND
                                    toggleUser(user.id, user.name, user.email, response.data.historico_pedido, true)

                                    //MUDA O ESTADO DA APLICAÇÃO PARA false
                                    toggleLoading(false)
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

    function handleQuantity(e:any) {
        if(Number(e.target.value) <= 1){
            setMyQuantity(1)
        }else{
            setMyQuantity(e.target.value)
        }
    }

    return(
        <div className={`w-screen h-screen bg-my-gray font-inter max-w-[500px] mx-auto flex flex-col items-center justify-start`}>
            <Header />
            <div className={`p-3 w-[80%] bg-my-white flex items-center justify-center mt-4 rounded-[12px]`}>
                <img src={myImg} />
            </div>
            <p className={`underline text-my-secondary font-bold text-[24px] my-4`}>{myName}</p>
            
            <div className={`w-[80%] flex flex-row justify-between mt-4`}>
                <label htmlFor="estampa" className={`w-[47%] bg-my-white p-3 rounded-[8px] flex flex-col`}>
                    <p className={`capitalize font-bold text-my-secondary text-center mb-1`}>estampa</p>
                    <img src={myEstampa} alt="" />
                </label>

                <input ref={inputFileRef} type="file" name="estampa" id="estampa" className={`hidden`} onChange={handleFileIMG} />

                <div
                    onClick={() => handleSize()}
                    className={`w-[47%] bg-my-white p-3 rounded-[8px] flex flex-col`}
                >
                    <p className={`capitalize font-bold text-my-secondary text-center mb-1`}>tamanho</p>
                    <p className={`text-center text-my-secondary text-[34px] uppercase font-bold`}>{mySize}</p>
                </div>
            </div>

            <div
                onClick={() => {
                    handleMaterial()
                }}
                className={`w-[80%] flex flex-row bg-my-white p-3 rounded-[6px] mt-3 items-center justify-between font-bold capitalize`}
            >
                <p className={`text-my-secondary font-bold capitalize text-[20px]`}>material</p>
                <p className='text-my-primary text-[18px]'>{myMaterial}</p>
            </div>
            
            <div className={`w-[80%] flex flex-row bg-my-white p-3 rounded-[6px] mt-3 items-center justify-between font-bold`}>
                <p className={`text-my-secondary font-bold capitalize text-[20px]`}>quantidade</p>
                <input type='number' value={myQuantity} onChange={handleQuantity} className='text-my-primary text-[18px] text-center w-[40px]' />
            </div>
            
            <div className={`w-[90%] flex flex-row bg-my-white p-3 rounded-[6px] mt-5 items-center justify-between font-bold`}>
                <p className={`text-my-secondary font-bold capitalize text-[22px]`}>valor</p>
                <p className='text-my-primary text-[20px]'>R$ {String(Number(Number(String(myPrice).replace(',', '.')) * Number(myQuantity)).toFixed(2)).replace('.', ',')}</p>
            </div>

            <button
                onClick={() => {
                    navigate('/principal')
                }}
                className={`text-my-white font-bold bg-my-primary rounded-[8px] mt-5 text-[20px] px-5 py-2`}
            >Continuar comprando</button>
            <button
                onClick={() => {
                    updateItemsCart(productSelectedEdit.id, {                        
                        id: productSelectedEdit.id,
                        image:  myImg,
                        material: myMaterial,
                        name: myName,
                        price: myPrice,
                        print: myEstampa,
                        quantity: myQuantity,
                        size: mySize,
                    })

                    //CHAMA A FUNÇÃO QUE TROCA A IMAGEM E SALVA NO BD
                    handleUpload()
                }}
                className={`text-my-white font-bold bg-my-secondary rounded-[8px] mt-3 mb-5 text-[18px] px-5 py-2`}
            >Voltar ao carrinho</button>

            <Footer />
            <ModalCart />
            <ModalUser />
            <ModalLogout />
            <LoadingPage />
        </div>
    )
}