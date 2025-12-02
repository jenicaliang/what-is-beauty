import React from "react";
import "./BeautyDefinition.css";

export default function BeautyDefinition() {
    return (
        <section className="definition-section">
            <div className="introduction">
                Here's beauty as defined by the Merriam-Webster dictionary.
            </div>
            <div className="definition-textbox">
                <div className="definition-heading">
                    <h1 className="word">BEAUTY</h1>
                    <h2 className="part">noun</h2>
                </div>
                <div className="definition">
                    : the quality or group of qualities in a person or thing that gives pleasure to the senses or the mind : LOVELINESS
                </div>
                <div className="examples">
                    exploring the natural beauty of the island
                </div>
                <div className="examples">
                    A thing of beauty is a joy forever …
                    —John Keats
                </div>
                <div className="examples">
                    Buddhism has taught me that inner beauty, the beauty that comes from loving and accepting yourself, imperfections and all, radiates to the outside.
                    —Tina Turner, quoted at nbcnews.com
                </div>
            </div>
        </section >
    )
}