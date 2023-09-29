import React, { useState, useEffect } from 'react';
import { getTeam, getTeamWins, getTeamLosses } from '../api/team';

const HomePage = () => {

    const [team, setTeam] = useState(null);
    const [teamName, setTeamName] = useState(null);
    const [wins, setWins] = useState(null);
    const [losses, setLosses] = useState(null);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const team = await getTeam(21700);
                setTeam(team.number);
                setTeamName(team.team_name);
                const winCount = await getTeamWins(team);
                setWins(winCount);
                const lossCount = await getTeamLosses(team);
                setLosses(lossCount);
            } catch (error) {
                console.error('Error fetching team number:', error);
            }
        }

        fetchTeamData();
    }, []);

    return (
        <div>
            <h1>Welcome to Vex Scouting Dashboard!</h1>
            <h2>Your team: {team} {teamName}</h2>
            <h2>Wins: {wins}</h2>
            <h2>Losses: {losses}</h2>
        </div>
    );
};

export default HomePage;