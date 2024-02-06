'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OPENFORT_URL = 'https://www.openfort.xyz/';

export default function RedirectToDemo() {
    const router = useRouter();
    useEffect(() => {
        router.push(OPENFORT_URL);
    })
    return <></>
}