'use client'

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';

const SignInPage = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL!}/sign-in`, { email, password }, { withCredentials: true });
            console.log(response);
            console.log('signin');
            console.log(response.data);
            if (response.status === 200) router.push('/chat');
        } catch (error : any) {
            console.error(error);
            if (error.response) {
                setError(error.response.data.detail || 'An error occurred');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => router.push('/sign-up');

    return (
        <div className="flex flex-col items-center justify-center h-full bg-black text-white w-full">
            <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full flex flex-col justify-between h-3/5"
                onSubmit={(e: React.FormEvent) => handleSignIn(e)}
            >
                <h1 className="text-3xl font-semibold text-center mb-6">Kanoon AI</h1>
                <Input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none text-white"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Sign In
                </Button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-400">Don't have an account?</p>
                <Button
                    onClick={handleSignUp}
                    className="mt-2 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Sign Up
                </Button>
            </div>
            <p className="mt-4 text-red-500">{error}</p>
        </div>
    );
};

export default SignInPage;