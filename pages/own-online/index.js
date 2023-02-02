import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import modelSelection from './model-selection'

function Index() {

    const router = useRouter();

    useEffect(() => {
        router.push('/own-online/model-selection');
    }, [router])

    return (
        <>
            <modelSelection />
        </>
    )
}

export default Index