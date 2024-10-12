//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: String,
    validate: Boolean,
    event?: () => any
}

export default function Button(props: Props) {
    return(
        <div className={`w-full flex items-center justify-center py-5 mt-5 rounded-[8px] font-bold font-inter text-[18px] text-my-white
            ${props.validate == false && 'bg-my-gray'}
            ${props.validate == true && 'bg-my-primary'}
        `}>
            {props.text}
        </div>
    )
}