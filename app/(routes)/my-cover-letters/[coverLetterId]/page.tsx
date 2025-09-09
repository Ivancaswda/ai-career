'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

type CoverLetterData = {
    fullName: string;
    position: string;
    skills: string[];
    companyName: string;
    achievements: string[];
    coverLetter: string;
}

const Page = () => {
    const router = useRouter();
    const { coverLetterId } = useParams<{ coverLetterId: string }>();
    const [coverLetter, setCoverLetter] = useState<CoverLetterData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (coverLetterId) {
            getCoverLetterDetails();
        }
    }, [coverLetterId]);

    const getCoverLetterDetails = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`/api/history?recordId=${coverLetterId}`);
            setCoverLetter(result.data.content.data);
        } catch (err) {
            console.error(err);
            setCoverLetter(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <Loader2Icon className='animate-spin text-purple-600 w-10 h-10'/>
            </div>
        );
    }

    if (!coverLetter) {
        return <div className="text-center mt-10 text-red-600 font-semibold">Cover letter не найдено.</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
                <div className="border-b pb-4">
                    <h1 className="text-3xl font-bold text-purple-700">{coverLetter.fullName}</h1>
                    <h2 className="text-xl text-gray-600 mt-1">{coverLetter.position}</h2>
                    <p className="text-gray-500 mt-1"><strong>Компания:</strong> {coverLetter.companyName}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Навыки:</h3>
                    <div className="flex flex-wrap gap-2">
                        {coverLetter.skills.map((skill, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Достижения:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {coverLetter.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Текст письма:</h3>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{coverLetter.coverLetter}</p>
                </div>

                <div className="flex justify-end">
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white" onClick={() => router.push("/dashboard")}>
                        Назад
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page;