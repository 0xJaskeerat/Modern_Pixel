import React from 'react'

const PageDescription = ({
    heading,
    description
}) => {
    return (
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>{heading}</h1>
            <p className='mt-2 text-[@666e75] text-[14px] text-[#CC0909] max-w-[500px] font-semibold'>{description}</p>
        </div>
    )
}

export default PageDescription