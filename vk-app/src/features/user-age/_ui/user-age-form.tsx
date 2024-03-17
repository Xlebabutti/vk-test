import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useUserAge from '../_vm/use-user-age';

interface FormData {
    name: string;
}

const UserAgeForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>();
    const [userName, setUserName] = useState<string>('');
    const [{ age, isLoading, error }, fetchData] = useUserAge(userName);

    const onSubmit = async (data: FormData) => {
        if (!data.name.trim()) {
            setError('name', {
                type: 'required',
                message: 'Name is required.',
            });
            return;
        }
        if (!isNaN(Number(data.name.trim()))) {
            setError('name', {
                type: 'typeError',
                message: 'Name should not be a number.',
            });
            return;
        }
        setUserName(data.name);
        fetchData();
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">
                        Name:
                    </label>
                    <input
                        type="text"
                        {...register('name')}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Get Age
                </button>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : null}
                {age !== null && <p>User Age: {age}</p>}
            </form>
        </div>
    );
};

export default UserAgeForm;
