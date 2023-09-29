import * as robotevents from "robotevents";

robotevents.authentication.setBearer("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTdiZTQwNTEwOGM5MDZlMTUzNDI5MTYyMWE0NWY2NmEzMzI2NWU2NjM0ZjAwOGQwMDJlY2UzYTYxZmVkOWMxOWRhZjBmZjE0NTVlZWYzMTYiLCJpYXQiOjE2OTU5NDM1MDUuNTI0NDExLCJuYmYiOjE2OTU5NDM1MDUuNTI0NDE1LCJleHAiOjI2NDI3MTgzMDUuNTE5MDIyOSwic3ViIjoiMTA5MTQ0Iiwic2NvcGVzIjpbXX0.kaSey1Y_veq0ufbhTf88HTm-jF9Vkh5H02w2ptdLh_zjUhrfaHDLk1dqHR3FuuCXBlzqNbqf8-29PKc_ftaWsOEiRuMZzNSvGMuWFKkR2M9SZG07gnkeQHiONQRqLqpkWKfxGZgln8MVDuywj4gIWvdxf03hTo2YyRHdAKLV8IDeHqYTlKcuYeCrX5hvqPFcxhatodU3fhQKhln2LbDigUOxvDQD0_Ibf9GcYiVcCMHTONSUPZXNtSk19FKdZhO45hypihHzossuqaXnb36qhLwnaj2EbywvdibdKBjtl9SEJ8fvzqmQ2Piko9sFPmoBQo8r8vlEUDV4y_zkD7_Kt16oKeDC60O2k-uzfrmTvRv3HS9kekkTxtrWplCx3yKLzpI6SzPfljbE63iAx99LEREpocpdidWZ-XLcN3yCGcrNMk8Lto2FaaTUx1XZJ8YEuta0xowfwkrPIab2tVtD_uwqWMBEeByMhNIzLr9SejpsA7ELhXNvsJ2yW9FJsuNRpEbezDUmAExn0rE3MfnLWTCfcXGQ4KJ1IhKCeFzn2BecXZ0MndN30IhNwnbSf0Uf2b0aHVCCBlvFtJJF8kC2jKxrvWBN-uTe52oLvPHmUZ2aCSKQKdomPkDdo3h76VAXqhph_SCE8FXiCiu-OOlr6_225KvmBNzWNRxIA6fv3Hc")

export async function getTeam(teamID) {
    const team = await robotevents.teams.get(teamID);
    return team;
}

export async function getTeamWins(team) {
    var count = 0;
    const matches = await team.matches();
    matches.forEach(match => {
        match.alliances[0].teams.forEach(allianceTeam => { 
            if (allianceTeam.team.id === team.id && !allianceTeam.sitting) {
                if (match.alliances[0].score > match.alliances[1].score) {
                    count++;
                }
            }
        })
        match.alliances[1].teams.forEach(allianceTeam => { 
            if (allianceTeam.team.id === team.id && !allianceTeam.sitting) {
                if (match.alliances[1].score > match.alliances[0].score) {
                    count++;
                }
            }
        })
    });
    return count;
}

export async function getTeamLosses(team) {
    var count = 0;
    const matches = await team.matches();
    matches.forEach(match => {
        match.alliances[0].teams.forEach(allianceTeam => { 
            if (allianceTeam.team.id === team.id && !allianceTeam.sitting) {
                if (match.alliances[0].score < match.alliances[1].score) {
                    count++;
                    return;
                }
            }
        })
        match.alliances[1].teams.forEach(allianceTeam => { 
            if (allianceTeam.team.id === team.id && !allianceTeam.sitting) {
                if (match.alliances[1].score < match.alliances[0].score) {
                    count++;
                }
            }
        })
    });
    return count;
}