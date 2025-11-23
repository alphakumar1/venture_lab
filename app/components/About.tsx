'use client'
import { url } from 'inspector';
import React, { useEffect, useState, useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface TeamMember {
    name: string;
    title: string;
    image: string;
}

// --- DATA ---
const features: Feature[] = [
    {
        title: 'CREATIVE DESIGN',
        description: 'Stunning and unique visual solutions.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M1.636 18.364l.707-.707M16 12h4m-4 0a2 2 0 11-4 0 2 2 0 014 0zM4 12H0m9.663-1.636l-.707-.707M18.364 1.636l-.707.707"/></svg>,
    },
    {
        title: 'EASY TO CUSTOMIZE',
        description: 'Flexible framework for quick modifications.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    },
    {
        title: 'SUPPORT 24/7',
        description: 'Round-the-clock expert assistance for clients.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
    },
    {
        title: 'COMMITMENT TO QUALITY',
        description: 'Delivering excellence in every single project.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    },
    {
        title: 'OPTIMIZATION',
        description: 'Performance-driven strategies for speed.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    },
    {
        title: 'DEVELOPMENT',
        description: 'Robust, scalable, and secure systems.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
    },
];

const teamMembers: TeamMember[] = [
    {
        name: 'Kartik Singh',
        title: 'Head',
        image: 'https://media.licdn.com/dms/image/v2/D5603AQHPvF9dTmUZfA/profile-displayphoto-crop_800_800/B56ZhBV8dSHUAI-/0/1753442929996?e=1765411200&v=beta&t=wUuvlUxAVtFRAgcLlxDl4BII5y5j7_abdltcaAH6geA',
    },
    {
        name: 'Shubham Solanki',
        title: 'Co-Head',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQGG51UkVP8aew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732520079133?e=1765411200&v=beta&t=FasUXxhIVGnZ8Pu3NxOGDwdHRS_N7ciH_5HC4ZygjB0',
    }
];

// --- STYLING ---
const CustomStyles = () => (
    <style>{`
        .header-bg {
            background-image: url('https://i.pinimg.com/736x/08/00/c1/0800c1a670b7e070d55bef3b1bfb4b57.jpg');
            background-size: cover;
            background-position: center;
        }
        .quote-border {
            border-left: 4px solid #8B5CF6;
        }
        /* Specific image effects for hover */
        .grayscale-image {
            filter: grayscale(100%);
            transition: filter 0.5s ease-in-out;
        }
        .grayscale-image:hover {
            filter: grayscale(0%);
        }
        .h-80 {
            height: 20rem;
        }
    `}</style>
);

export default function App() {
    return (
        <div className="min-h-screen bg-black-100 text-gray-800 antialiased font-sans">
            <CustomStyles />

            {/* Header/Hero Section */}
        <header className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden header-bg">
                <div className="relative inset-0 text-white py-24 text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-widest uppercase mb-2">
                        ABOUT US
                    </h1>
                    <p className="text-xl italic text-gray-300">
                        A team for people who want better results, fast.
                    </p>
                </div>
            </header>

            {/* WE ARE Venture */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black shadow-lg rounded-lg -mt-20 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    WE ARE <span className="text-purple-600">Venture</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-lg mb-6 leading-normal text-white">
                            "We believe great ventures start with great strategy. I detail the frameworks used by industry leaders to achieve product-market fit and drive sustainable, long-term growth."
                        </p>    
                        <p className="mb-8 text-orange-500 quote-border pl-4 py-2 italic text-base">
                            "Dedicated to innovation and delivering measurable success."
                        </p>
                        <p className="text-base text-white mb-8">
                            "Our mission is simple: decode the complexity of scaling. I empower entrepreneurs with the knowledge and tools to execute their vision without compromise."
                        </p>
                        <div className="mt-8">
                            <span className="text-white text-4xl font-serif italic font-bold">S. R.</span>
                            <p className="text-sm text-white">SHUBHAM RAJ, Founder</p>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D5635AQFrQvRIFWhcrw/profile-framedphoto-shrink_800_800/B56ZpSnto9J4Ag-/0/1762322733915?e=1764496800&v=beta&t=_EedOBKEcH1arl_DbDbfBlPU7ucjSEJb78laDDZYN6U" alt="Portrait of a Umbra executive"
                            className="w-full h-auto object-cover grayscale-image"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/8B5CF6/ffffff?text=Image+Placeholder' }}
                        />
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US & Features */}
            <section className="bg-black py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="https://i.pinimg.com/736x/f1/37/b1/f137b1914b1b9358e9ff9c0a76b852f3.jpg" alt="Venture team working together"
                                className="w-full h-auto object-cover"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/8B5CF6/ffffff?text=Image+Placeholder' }}
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-8">
                                WHY CHOOSE US
                            </h2>
                            <p className="text-white mb-10 leading-relaxed">
                                We blend cutting-edge technology with deep industry expertise to deliver bespoke solutions that drive tangible results. Our commitment to excellence is what sets us apart.
                            </p>

                            
                            <div id="features-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="shrink-0 text-orange-600">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-purple-400 mb-1">{feature.title}</h3>
                                            <p className="text-sm text-white">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*MEET OUR TEAM */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black shadow-lg rounded-lg my-12">
                <div className="text-center mb-12">
                    <span className="text-purple-600 text-lg font-semibold tracking-wider uppercase">
                        | MEET OUR TEAM |
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                        We Are the Best Team
                    </h2>
                </div>

                {/* Team Members Grid*/}
                <div id="team-members-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={member.image}
                                alt={`Portrait of ${member.name}`}
                                className="w-full h-auto object-cover bg-center  grayscale-image"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x350/8B5CF6/ffffff?text=TEAM' }}
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-purple-600">{member.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{member.title}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className="mt-8  mx-auto space-x-2 px-8 py-3 text-base font-semibold text-gray-900 bg-purple-700 rounded-lg shadow-xl hover:bg-purple-400 transition duration-300 transform hover:scale-[1.03] active:scale-100">
                        <span>More Members..</span>
                    </button>
            </section>
        </div>
    );
}
