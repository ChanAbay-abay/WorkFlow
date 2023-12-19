module.exports = (sequilize, Sequilize) => {
    const Roletype = sequilize.define("roletype", {
        roleID: {
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
        roleName: {
            type: Sequilize.STRING(50),
        },
        roleDesc: {
            type: Sequilize.STRING(50),
        },
    })

    return Roletype
}