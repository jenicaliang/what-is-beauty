import React, { useState } from "react";
import "./BeautyCarouselSection.css";

const beauties = [
    { src: "assets/images/philosophy_of_beauty.jpg", heading: "Beauty in Philosphy", text: "Beauty has long been debated in philosophy, specifically regarding whether it is objective or subjective. Plato saw beauty as a universal human desire, tied to health and wealth. Kant argued that beauty is subjective but can have universal appeal through shared human sensibilities. Hegel and Schopenhauer emphasized aesthetic experience as a way to understand truth and emotion."},
    { src: "assets/images/white_beauty.jpg", heading: "White Beauty", text: "White beauty often emphasizes features common in European-descended populations, such as narrow faces, high cheekbones, and slim body shapes. Historically, ideals have been influenced by Western art and media, from the Renaissance to modern fashion." },
    { src: "assets/images/asian_beauty.jpg", heading: "Asian Beauty", text: "Asian beauty standards often highlight heart-shaped or wider faces, full lips, pale skin, and thin body proportions. Cosmetic practices like double eyelid surgery are common in some regions. Beauty ideals are influenced by both traditional East Asian practices and contemporary media trends." },
    { src: "assets/images/black_beauty.jpg", heading: "Black Beauty", text: "Black beauty often emphasizes prominent lips, broader noses, and shapely figures. Skin tone preferences vary regionally, with lighter skin sometimes favored in certain contexts. Beauty appreciation integrates physical features with cultural and stylistic elements, and practices differ across African and African-descended communities." },
    { src: "assets/images/latino_beauty.webp", heading: "Latino Beauty", text: "Latino beauty standards highlight larger lips, midface prominence, and curvier body shapes. Skin tone preferences vary, reflecting a mix of European, Indigenous, and African heritage. Cosmetic trends such as rhinoplasty or body contouring are common, shaped by both local traditions and global media influences." },
    { src: "assets/images/globalization.avif", heading: "Globalization of Beauty", text: "Globalization spreads Western beauty ideals worldwide through media, fashion, and social platforms. Traditional cultural practices, like henna or threading, are increasingly adopted across cultures. Exposure to diverse aesthetics via social media is creating hybridized beauty standards, blending local and global influences." },
];

export default function Banner() {
    const [activeBeauty, setActiveBeauty] = useState(null);

    const handleClose = (e) => {
        if (e.target.classList.contains("overlay")) {
            setActiveBeauty(null);
        }
    };

    return (
        <div className="banner-container">
            {/* Text content above the carousel */}
            <div className="text-content">
                <p>And here's beauty as defined by different cultures and disciplines.</p>
                <p className="text-caption">Click through to learn more about each perspective.</p>
            </div>

            {/* Carousel banner */}
            <div className="banner">
                <div className="slider" style={{ "--quantity": beauties.length }}>
                    {beauties.map((beauty, index) => (
                        <div
                            className="item"
                            style={{ "--position": index + 1 }}
                            key={index}
                            onClick={() => setActiveBeauty(beauty)}
                        >
                            <img src={beauty.src} alt={beauty.heading} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay on click */}
            {activeBeauty && (
                <div className="overlay" onClick={handleClose}>
                    <div className="overlay-box">
                        <h1>{activeBeauty.heading}</h1>
                        <p>{activeBeauty.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
