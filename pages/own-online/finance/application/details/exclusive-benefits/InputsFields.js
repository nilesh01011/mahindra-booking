import React, { useEffect, useRef, useState } from 'react'

function InputFields({ inputType, theme, placeholder, maxLength, mandatory, required, id, validity, values }) {

    // const handleInputs = useRef();
    const [textValue, setTextValue] = useState('');

    useEffect(() => {

        if (values) {
            setTextValue(values)
        }

    }, [values])

    return (
        <>
            {/* required={required ? true : null} */}
            {/* ${theme === "dark" ? `placeholder:text-[#A3A3A3] bg-[#0B0B0C]` : ''} */}
            <input id={`${id ? id : ''}`} required={required ? true : null} value={textValue} maxLength={maxLength} placeholder={mandatory ? placeholder + mandatory : placeholder} onChange={(e) => setTextValue(e.target.value)} type={inputType} className={`w-full p-[14px_16px] rounded-[10px] placeholder:capitalize ${theme === "dark" ? 'bg-[#0B0B0C] text-white placeholder:text-[#A3A3A3]' : 'bg-[#F4F4F4] text-black placeholder:text-[#635D5D]'}`} style={{ border: `${validity === true ? '1px solid #FF3E5B' : ''}` }} />
        </>
    )
}

export default InputFields