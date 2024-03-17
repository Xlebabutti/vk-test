import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CatFactTextProps {
    fact: string | null;
    isLoading: boolean;
}

const CatFactInput: React.FC<CatFactTextProps> = ({ fact, isLoading }) => {
    const [inputValue, setInputValue] = useState(fact || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (fact && inputRef.current) {
            setInputValue(fact);
            const words = fact.split(' ');
            const secondWordIndex = fact.indexOf(words[1]);

            setTimeout(() => {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(
                    secondWordIndex + words[1].length,
                    secondWordIndex + words[1].length,
                );
            }, 0);
        }
    }, [fact]);

    const textVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
    };

    return (
        <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-green-500"
        >
            {fact && (
                <div className="block">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default CatFactInput;
