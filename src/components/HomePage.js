import React, { useState, useEffect } from 'react';
import { getTeamNumber } from '../api/team';

const HomePage = () => {

    const [team, setTeam] = useState(null);

    useEffect(() => {
        async function fetchTeamNumber() {
            try {
                const teamNumber = await getTeamNumber(21700);
                setTeam(teamNumber);
            } catch (error) {
                console.error('Error fetching team number:', error);
            }
        }

        fetchTeamNumber();
    }, []);

    return (
        <div>
            <h1>Welcome to Vex Scouting Dashboard!</h1>
            <h2>Your team: {team}</h2>
        </div>
    );
};

export default HomePage;