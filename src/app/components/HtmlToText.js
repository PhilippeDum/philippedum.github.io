'use client';

// components/HtmlToText.js
import React from 'react';

const HtmlToText = ({ html }) => {
    // Fonction pour convertir le HTML en texte brut
    const htmlToText = (html) => {
        // Créer un élément DOM temporaire
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Extraire le texte brut du contenu HTML
        return doc.body.textContent || "";
    };

    return (
        <div>
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                {htmlToText(html)}
            </pre>
        </div>
    );
};

export default HtmlToText;