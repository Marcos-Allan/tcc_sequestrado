//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
  images: string[];
}

export default function Carousel(props: Props) {

    //UTILIZAÇÃO DO HOOK useState
    const [currentIndex, setCurrentIndex] = useState(0);

    //FUNÇÃO RESPONSÁVEL POR IR PARA A PRÓXIMA IMAGEM
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length);
    };

    //FUNÇÃO RESPONSÁVEL POR IR PARA A IMAGEM ANTERIOR
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="overflow-hidden">
                <img
                    src={props.images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-full h-64 object-cover"
                />
            </div>
      
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent text-my-white text-[48px] p-2 rounded-full"
            >
                ‹
            </button>
        
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-my-white text-[48px] p-2 rounded-full"
            >
                ›
            </button>
        </div>
    );
};