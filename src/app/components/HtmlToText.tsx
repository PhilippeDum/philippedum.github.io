'use client';

// components/HtmlToText.js
import React, { useState, useEffect } from 'react';

interface HtmlToTextProps {
    html: string;
}

const HtmlToText: React.FC<HtmlToTextProps> = ({ html }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            setText(doc.body.textContent || '');
        }
    }, [html]);

    return (
        <div>
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                {text}
            </pre>
        </div>
    );
};

export default HtmlToText;