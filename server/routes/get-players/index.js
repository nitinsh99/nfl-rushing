
const { getFilteredPlayers, getPaginatedPlayers, getSortedPlayers } = require('./common');
const PLAYERS = require('../../../database/rushing');
const TOTAL = PLAYERS.length;
const PAGE_SIZE = 10;

module.exports = {
    method: 'GET',
    path: '/api/v1/players',
    handler: function (request, h) {

        const { page, sort, search } = request.query;
        const sortedPlayers = getSortedPlayers({ sort });
        const filteredPlayers = getFilteredPlayers({ search, sortedPlayers });
        const players = getPaginatedPlayers({ filteredPlayers, page });

        return {
            players,
            pagination: {
                page: parseInt(page),
                total: TOTAL,
                pageSize: PAGE_SIZE
            }
        }
    },
    options: {
        cors: {
            origin: ['*']
        }
    }
}
