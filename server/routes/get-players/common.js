const Hoek = require('@hapi/hoek');

const { getNumber } = require('../../utils');
const PLAYERS = require('../../../database/rushing');
const PAGE_SIZE = 10;

/**
 * 
 * @param filteredPlayers : Array with players filtered using the search query (if provided)
 * @param page : Page number in the pagination
 */
module.exports.getPaginatedPlayers = ({ filteredPlayers = [], page }) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return (page) ? filteredPlayers.slice(start, end) : filteredPlayers;
}

/**
 * 
 * @param sort : Name of the column used to sort the table
 */
module.exports.getSortedPlayers = ({ sort }) => {
    const _players = Hoek.clone(PLAYERS);
    return (sort) ? _players.sort((a, b) => (getNumber(a[sort]) > getNumber(b[sort])) ? 1 : -1) : _players;
}

/**
 *
 * @param search : Search query param (name of the player)
 * @param sortedPlayers : Array with players sorted using the sort query param
 */
module.exports.getFilteredPlayers = ({ search, sortedPlayers }) => {

    if (search) {
        const fileteredPlayers = sortedPlayers.filter((player) => {
            if (player.Player && player.Player.toLowerCase().includes(search.toLowerCase())) {
                return true;
            }
            return false;
        });
        return fileteredPlayers;
    }
    return sortedPlayers;
}
