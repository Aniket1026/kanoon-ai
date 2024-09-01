'use client'

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

const SignUpPage = () => {

    const router = useRouter();

    const handlesignup = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('signup');
    }

    const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => router.push('/');

    return (
        <div className="flex flex-col items-center justify-center h-full bg-black text-white w-full">
            <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full flex flex-col justify-between h-3/5"
                onSubmit={(e: React.FormEvent) => handlesignup(e)}
            >
                <h1 className="text-3xl font-semibold text-center mb-6">Kanoon AI</h1>
                <Input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none text-white"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400"
                />
                <Button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Sign Up
                </Button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-400">Already have an account?</p>
                <Button
                    onClick={handleSignIn}
                    className="mt-2 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
};

export default SignUpPage;