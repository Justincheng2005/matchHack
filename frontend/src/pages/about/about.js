import React from 'react';
import './about.css';

const teamMembers = [
    {
        name: "Radhika Agrawal",
        university: "Ohio Wesleyan University",
        imgSrc: "../assets/Agrawal, Radhika.JPG",
    },
    {
        name: "Rudraksh Singh Chauhan",
        university: "Ohio Wesleyan University",
        imgSrc: "../assets/rudraksh.jpeg",
    },
    {
        name: "Justin Cheng",
        university: "UMass, Amherst",
        imgSrc: "../assets/justin.jpeg",
    }
];

function Team() {
    return (
        <div className="team-page">
            <h2 className="team-title">Meet the Team</h2>
            <div className="team-container">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <img src={member.imgSrc} alt={member.name} className="team-member-photo" />
                        <h3 className="team-member-name">{member.name}</h3>
                        <p className="team-member-university">{member.university}</p>
                    </div>
                ))}
            </div>
            <div className="team-description">
                <p>We are dedicated to fostering meaningful connections through study circles that encourage collaboration and growth. Our goal is to create a supportive environment where learning thrives and knowledge is shared.</p>
            </div>
        </div>
    );
}

export default Team;