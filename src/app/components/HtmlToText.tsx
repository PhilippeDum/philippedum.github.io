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


    // Fonction pour convertir le HTML en texte brut
    /* const htmlToText = (html) => {
        // Créer un élément DOM temporaire
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Extraire le texte brut du contenu HTML
        return doc.body.textContent || "";
    }; */

    return (
        <div>
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                {/* {htmlToText(html)} */}
                {text}
            </pre>
        </div>
    );
};

export default HtmlToText;