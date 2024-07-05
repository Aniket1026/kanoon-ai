import { Button } from '@/components/ui/button';
import QuestionForm from '../components/QuestionForm';

export default function HomePage() {
    return (
        <div className="p-4 flex flex-col items-center justify-between  min-w-full">
            <h1 className="text-2xl mb-4 font-light text-slate-400">Welcome to Sanvidhaan AI</h1>
            <QuestionForm />
        </div>
    );
}

