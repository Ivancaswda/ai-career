import React from 'react'

const Report = ({data}: any) => {
    return (
        <div className="max-w-4xl mx-auto  bg-gray-50 rounded-2xl  space-y-8">
            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-purple-700 text-center">
                📊 Результат анализа резюме
            </h1>

            {/* Общая оценка */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Общая оценка</h2>
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#E5E7EB"
                            strokeWidth="12"
                            fill="transparent"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#8B5CF6"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            strokeDashoffset={`${
                                2 * Math.PI * 70 - (2 * Math.PI * 70 * data.overall_score) / 100
                            }`}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-purple-700">
              {data.overall_score}%
            </span>

                    </div>
                </div>
                <span className="text-xl font-semibold text-gray-600">
              {data.overall_feedback}
            </span>
                <p className="italic text-gray-600 text-center">
                    {data.summary_comment}
                </p>
            </div>

            {/* Секции */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(data.sections).map(([section, info]: any) => (
                    <div key={section} className="p-5 bg-white rounded-xl shadow space-y-3">
                        <h2 className="capitalize font-bold text-purple-700">{section}</h2>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-purple-500 h-3 rounded-full transition-all"
                                style={{ width: `${info.score}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600">
                            <b>Оценка:</b> {info.score}/100
                        </p>
                        <p className="text-gray-700">{info.comment}</p>
                    </div>
                ))}
            </div>

            {/* Советы */}
            <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-purple-700 mb-3 text-lg">
                    ✨ Советы по улучшению
                </h2>
                <ul className="space-y-2">
                    {data.tips_for_improvement.map((tip: string, i: number) => (
                        <li
                            key={i}
                            className="flex items-start space-x-2 text-gray-700 bg-purple-50 px-3 py-2 rounded-lg"
                        >
                            <span className="text-purple-600">✔</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Сильные стороны */}
            <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-green-600 mb-3 text-lg">✅ Что хорошо</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {data.whats_good.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>

            {/* Слабые стороны */}
            <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-red-600 mb-3 text-lg">
                    ⚠ Что нужно улучшить
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {data.needs_improvement.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Report
