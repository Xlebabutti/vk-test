import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserAgeData {
    name: string | null;
    age: number | null;
}

interface UserAgeError {
    error: string | null;
}

export interface UserAgeProps extends UserAgeData, UserAgeError {
    isLoading: boolean;
}

const fetchUserAge = async (name: string): Promise<UserAgeData> => {
    try {
        const response = await axios.get(`https://api.agify.io/?name=${name}`);
        return { name, age: response.data.age };
    } catch (error) {
        console.error('Error fetching user age:', error);
        throw new Error('Failed to fetch user age');
    }
};

const useUserAge = (initialName: string): [UserAgeProps, () => void] => {
    const [cachedAges, setCachedAges] = useState<{
        [name: string]: number | null;
    }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!cachedAges[initialName]) {
            setIsLoading(true);
            try {
                const result = await fetchUserAge(initialName);
                setCachedAges((prevState) => ({
                    ...prevState,
                    [initialName]: result.age,
                }));
            } catch (error) {
                setError('Failed to fetch user age');
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [initialName, cachedAges]);

    const refreshData = () => {
        setCachedAges((prevState) => ({
            ...prevState,
            [initialName]: null,
        }));
        fetchData();
    };

    return [
        {
            name: initialName,
            age: cachedAges[initialName] || null,
            isLoading,
            error,
        },
        refreshData,
    ];
};

export default useUserAge;
