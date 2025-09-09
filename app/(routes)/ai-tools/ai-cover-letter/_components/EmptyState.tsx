import React, {useState} from 'react'


const questionList = [
    "Создай для меня проводительное письмо",

]

const EmptyState = ({onInput}: any) => {



    return (
        <div>
            <h2 className='text-xl'></h2>
            <div>
                {questionList.map((ques) =>
                    <div key={ques} onClick={() => onInput(ques)} className={'p-4 cursor-pointer text-center border rounded-lg my-3'}>
                        {ques}
                    </div>
                )}
            </div>
        </div>
    )
}
export default EmptyState
