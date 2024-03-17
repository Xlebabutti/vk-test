import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCatFact = async () => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        return response.data.fact;
    } catch (error) {
        console.error('Error fetching cat-fact:', error);
        throw error;
    }
};

export const useCatFact = () => {
    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ['catFact'],
        queryFn: fetchCatFact,
        refetchOnWindowFocus: false,
    });

    return { isLoading, data, error, refetch };
};
