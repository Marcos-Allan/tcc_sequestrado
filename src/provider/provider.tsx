//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from "react";

//IMPORTAÇÃO DOS CONTEXTOS
import { GlobalContext } from "./context";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    //UTILIZAÇÃO DO HOOK useState
    const [user, setUser] = useState<any>({ name: "MA", email: "allanmenezes880@gmail.com", history: [
        { data: '9/10/2024', name: 'Caneca Porcelana', img: 'undefined', price: 19.90, quantity: 2 },
        { data: '24/08/2024', name: 'Caneca Mágica', img: 'undefined', price: 24.75, quantity: 4 }
    ] });
    const [openCart, setOpenCart] = useState<boolean>(false)
    const [openPerfil, setOpenPerfil] = useState<boolean>(false)
    const [openNotifys, setOpenNotifys] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<any>({ image: 'undefined', name:'undefined', price:'undefined' })

    return (
        <GlobalContext.Provider value={{ user, setUser, openCart, setOpenCart, openPerfil, setOpenPerfil, openNotifys, setOpenNotifys, productSelected, setProductSelected } as any}>
            {children}
        </GlobalContext.Provider>
    );
};
