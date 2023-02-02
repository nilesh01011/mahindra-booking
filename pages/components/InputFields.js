import React, { useEffect, useRef, useState } from 'react'

function InputFields({ inputType, theme, placeholder, maxLength, mandatory, required, id, validity, disabled, values }) {

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
            <input id={`${id ? id : ''}`} disabled={disabled ? true : null} value={textValue} maxLength={maxLength} placeholder={mandatory ? placeholder + mandatory : placeholder} onChange={(e) => setTextValue(e.target.value)} type={inputType} className={`w-full p-[14px_16px] rounded-[10px] placeholder:capitalize ${theme === "dark" ? `placeholder:text-[#A3A3A3] ${disabled ? 'bg-[#DEDEDE]' : 'bg-[#0B0B0C]'}` : `${disabled ? 'bg-[#DEDEDE]' : 'bg-[#F4F4F4]'} placeholder:text-[#635D5D]`}`} style={{ border: `${validity === true ? '1px solid #FF3E5B' : ''}` }} />
        </>
    )
}

export default InputFields