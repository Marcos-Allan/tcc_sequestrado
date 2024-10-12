//IMPORTAÇÃO DAS IMAGENS
import image from '../../../public/google.png'

export default function GoogleLogin() {
    return(
        <div className={`w-full border-[1px] border-my-gray py-3 rounded-[12px] flex items-center justify-center mt-8`}>
            <img
                src={image}
                className="w-[36px]"
            />
            <p className="font-inter font-bold ml-2 text-[18px]">Cadastre-se com o google</p>
        </div>
    )
}