import { motion } from 'framer-motion';

interface CatFactButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const CatFactButton: React.FC<CatFactButtonProps> = ({
    onClick,
    isLoading,
}) => {
    const buttonVariants = {
        hover: { scale: 1.1, backgroundColor: '#3B82F6' },
        tap: { scale: 0.9 },
    };

    const buttonTransition = {
        duration: 0.5,
        ease: 'easeInOut',
    };

    return (
        <motion.button
            variants={buttonVariants}
            transition={buttonTransition}
            whileHover="hover"
            whileTap="tap"
            onClick={onClick}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 m-2 rounded-lg"
        >
            <p></p>Press to get the fact
        </motion.button>
    );
};

export default CatFactButton;
