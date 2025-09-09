import React, {useState} from 'react'


const questionList = [
    "Как улучшить карьеру для сантехника",
    'Назови специальности по которым можно начать свою карьеру'
]

const EmptyState = ({onSelectOption}: any) => {



    return (
        <div>
            <h2 className='text-xl'></h2>
            <div>
                {questionList.map((ques) =>
                    <div onClick={() => onSelectOption(ques)} key={ques} className={'p-4 text-center cursor-pointer border rounded-lg my-3'}>
                        {ques}
                    </div>
                )}
            </div>
        </div>
    )
}
export default EmptyState
