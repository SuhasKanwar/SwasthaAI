import React from 'react';
import Link from 'next/link';

export default function BackToLogin() {
    return (
        <section className='flex flex-col items-center justify-center min-h-screen'>
            <div className='text-center mb-4 bg-gray-400 p-4 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold mb-2'>You are not logged in</h1>
                <p className='text-lg'>Please log in to access this page.</p>
                <Link href="/login" className='mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors'>
                    Back to Login
                </Link>
            </div>
        </section>
    );
}