module.exports = (sequilize, Sequilize) => {
    const Memberlist = sequilize.define("memberlist", {
        memberListID: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teamID: {
            type: Sequilize.INTEGER,
            references: {
                model: "teams",
                key: "teamID",
            }
        },
        roleID: {
            type: Sequilize.INTEGER,
            references: {
                model: "roletypes",
                key: "roleID",
            }
        },
        userID: {
            type: Sequilize.INTEGER,
            references: {
                model: "users",
                key: "userID",
            }
        },
        dateJoinedTeam: {
            type: Sequilize.DATE,
            defaultValue: Sequilize.NOW,
        },
    })

    return Memberlist
}