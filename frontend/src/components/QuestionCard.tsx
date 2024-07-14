import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface QuestionCardProps {
    question: string;
    description: string;
    onAsk: (question: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, description, onAsk }) => {
    return (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => onAsk(question)}
        >
            <CardHeader>
                <CardTitle className="text-lg">{question}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{description}</p>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;