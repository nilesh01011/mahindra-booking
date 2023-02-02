import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Summary from './summary/index'

function Index() {
    const router = useRouter();

    useEffect(() => {
        router.push('/own-online/finance/summary');
    }, [router])

    return (
        <Summary />
    )
}

export default Index