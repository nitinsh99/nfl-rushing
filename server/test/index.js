'use strict';

const { expect } = require('@hapi/code');

const { getFilteredPlayers, getPaginatedPlayers, getSortedPlayers } = require('../routes/get-players/common');

describe('Players', () => {

    it('Sorts the players based on sort query', () => {

        const sort = 'TD';

        const sortedPlayers = getSortedPlayers({sort});
        expect(sortedPlayers[0].TD).to.be.lessThan(sortedPlayers[sortedPlayers.length-1].TD)
    });

    it('Filters the players based on search query', () => {

        const sortedPlayers = [
            {
                Player: 'abc'
            },
            {
                Player: 'def'
            }];
        const search = 'abc';

        const filteredPlayers = getFilteredPlayers({sortedPlayers, search});
        expect(filteredPlayers.length).to.equal(1);
        expect(filteredPlayers[0].Player).to.equal('abc');
    });

    it('Paginate the filetered players', () => {

        const sortedPlayers = [
            {
                Player: 'abc'
            },
            {
                Player: 'def'
            }];
        const search = 'abc';
        const page = 1;

        const filteredPlayers = getFilteredPlayers({sortedPlayers, search});
        const paginatedPlayers = getPaginatedPlayers({filteredPlayers, page});
        expect(paginatedPlayers.length).to.equal(1);
        expect(paginatedPlayers[0].Player).to.equal('abc');
    });

});
