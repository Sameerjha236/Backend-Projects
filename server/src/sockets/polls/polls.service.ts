const teams = [
  {
    id: "1",
    name: "Mclaren",
    vote: 0,
  },
  {
    id: "2",
    name: "Redbull",
    vote: 0,
  },
  {
    id: "3",
    name: "Ferrari",
    vote: 0,
  },
];

export const getCurrentTeam = () => {
  return teams;
};

export const updateVote = (teamId: string) => {
  const team = teams.find((t) => t.id === teamId);

  if (team) {
    team.vote += 1;
    return true;
  }
  return false;
};
