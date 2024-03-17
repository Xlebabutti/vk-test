import { useEffect, useState } from 'react';
import { useCatFact } from '../_vm/use-cat-fact';
import CatFactButton from './cat-fact-button';
import CatFactInput from './cat-fact-input.tsx';

const CatFact: React.FC = () => {
    const [fact, setFact] = useState('');
    const { data, error, isLoading, refetch } = useCatFact();

    const handleButtonClick = () => {
        refetch();
        setFact(data.fact);
    };

    useEffect(() => {
        if (data) {
            setFact(data);
        }
    }, [data]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col justify-center items-center">
                <CatFactInput fact={fact} isLoading={isLoading} />
                <CatFactButton
                    onClick={handleButtonClick}
                    isLoading={isLoading}
                />
            </div>
            {error && (
                <strong>
                    <p className="text-red-500">Error fetching cat-fact</p>
                </strong>
            )}
        </div>
    );
};

export default CatFact;
