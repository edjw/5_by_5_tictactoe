/**
 * @typedef {Object} Game
 * @property {string} title - The title of the game.
 * @property {string} link - The link to the game.
 * @property {string} description - The description of the game.
 */

/**
 * @type {Game[]}
 */
export let games = [
    {
        title: "123",
        link: "/123",
        description: "1 point for a line of a 3, 2 for a 4, 3 for a 5"
    },
    {
        title: "135",
        link: "/135",
        description: "1 point for a line of a 3, 3 for a 4, 5 for a 5. Best?"
    },
    {
        title: "135, O plays twice on first turn",
        link: "/135_O_two_turns",
        description:
            "1 point for a line of 3, 3 for a 4, 5 for a 5.<br />O gets to fill two spaces on their first turn"
    },
    {
        title: "1357",
        link: "/1357",
        description: "1 point for a line of 2, 3 for a 3, 5 for a 4, 7 for a 5"
    },
    {
        title: "1357, O plays twice on first turn",
        link: "/1357_O_two_turns",
        description:
            "1 point for a line of 2, 3 for a 3, 5 for 4a , 7 for a 5.<br />O gets to fill two spaces on their first turn"
    },
    {
        title: "1357, Edge twos only",
        link: "/1357_edge_twos_only",
        description: "1 point for a line of 2 touching the edge, 3 for a 3, 5 for a 4, 7 for a 5"
    },
    {
        title: "1357, Edge twos only, O plays twice on first turn",
        link: "/1357_edge_twos_only_O_two_turns",
        description: "1 point for a line of 2 touching the edge, 3 for a 3, 5 for a 4, 7 for a 5<br />O gets to fill two spaces on their first turn"
    },


];