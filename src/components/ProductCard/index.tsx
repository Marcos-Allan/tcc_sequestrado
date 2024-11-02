//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    image: String,
    name: String,
    price: String,
    onClick: () => any
}

export default function ProductCard(props: Props) {

    const price1 = props.price.split(',')[0]
    const price2 = props.price.split(',')[1]

    return(
        <div
            onClick={() => props.onClick()}
            className="flex items-center justify-start flex-col bg-my-pink min-w-[40%] py-1 px-2 rounded-[16px] mx-[5px] mt-4"
        >
            <div className="flex items-center justify-center w-[120px] h-[120px]">
                <img src={`${props.image}`} alt="" className={`w-auto h-auto`} />
            </div>
            <h1 className={`text-my-secondary font-inter font-bold text-[24px]`}>{props.name}</h1>
            <p className={`text-[13px] font-bold font-inter`}>a partir de <span className={`text-my-primary`}>
                    R$
                    <span className={`text-[20px]`}>
                        {price1}
                    </span>
                    ,{price2}
                </span>
            </p>
        </div>
    )
}