//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from "react";

//IMPORTAÇÃO DOS CONTEXTOS
import { GlobalContext } from "./context";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    //RESGATA O VALOR DO LOCALSTORAGE
    const userLS = localStorage.getItem('userPU')

    //UTILIZAÇÃO DO HOOK useState
    const [user, setUser] = useState<any>(
        {
            id: userLS !== null ? JSON.parse(userLS).id : 0,
            name: userLS !== null ? JSON.parse(userLS).name : "MA",
            email: userLS !== null ? JSON.parse(userLS).email : "allanmenezes880@gmail.com",
            history: userLS !== null ? JSON.parse(userLS).history : [
                { data: '9/10/2024', name: 'Caneca Porcelana', img: 'undefined', price: 19.90, quantity: 2, estampa: '', },
                { data: '24/08/2024', name: 'Caneca Mágica', img: 'undefined', price: 24.75, quantity: 4, estampa: '', }
            ]
        }
    );
    const [openCart, setOpenCart] = useState<boolean>(false)
    const [openPerfil, setOpenPerfil] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<any>({ image: 'undefined', name:'undefined', price:'undefined' })
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    //FUNÇÃO RESPONSÁVEL POR ADICIONAR NOVO ITEM NO CARRINHO
    function addToCart(newItem: any) {
        //RETORNA true SE O ITEM ESTIVR NO CARRINHO E false SE NÃO ESTIVER
        const existingItem = cart.find((item: any) => item.name === newItem.name);

        //VERIFICA SE O ITEM JA ESTÁ NO CARRINHO OU NÃO
        if (existingItem) {
            //ADICIONA MAIS NA QUANTIDADE DO PRODUTO
            setCart(
                cart.map((item: any) =>
                    item.name === newItem.name
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
                )
            );
        }else {
            //COLOCA O ITEM NO CARRINHO MAIS NA QUANTIDADE DO PRODUTO
            setCart([...cart, { ...newItem, quantity: newItem.quantity }]);
        }
    }

    //FUNÇÃO RESPONSÁVEL POR MUDAR O ESTADO DE CARREGAMENTO DA PÁGINA
    function toggleLoading(state:boolean) {
        setLoading(state)
    }

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    function toggleUser(id:any, name:string, email:string, history:any) {
        //SALVA OS DADOS DO USUÁRIO NO localStorage
        localStorage.setItem('userPU', JSON.stringify({ id: id, name: name, email: email, history: history }))
        
        //SALVA OS DADOS NO FRONTEND DA APLICAÇÃO
        setUser({ id: id, name: name, email: email, history: history })
    }

    return (
        <GlobalContext.Provider value={{ user, setUser, openCart, setOpenCart, openPerfil, setOpenPerfil, productSelected, setProductSelected, cart, addToCart, loading, toggleLoading, toggleUser } as any}>
            {children}
        </GlobalContext.Provider>
    );
};
