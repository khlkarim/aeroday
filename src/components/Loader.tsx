"use client"

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loader() {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <DotLottieReact
                loop
                autoplay
                src="/assets/images/loader.lottie"
                style={{ width: 80, height: 80 }}
            />
        </div>
    );
}
