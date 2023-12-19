module.exports = (sequilize, Sequilize) => {
    const Team = sequilize.define("team", {
        teamID: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teamName: {
            type: Sequilize.STRING(50),
            allowNull: false,
        },
        teamDesc: {
            type: Sequilize.STRING(50),
            allowNull: false,
        },
        profilePicture: {
            type: Sequilize.STRING, // Assuming the profile picture is stored as a URL
            allowNull: true, // Set to false if a profile picture is required
        },
        teamDateCreated: {
            type: Sequilize.DATE,
            defaultValue: Sequilize.NOW,
        }
    })

    return Team
}