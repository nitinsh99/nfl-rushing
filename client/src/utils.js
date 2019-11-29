

import React from 'react';
import { Button, Icon, Input } from 'antd';
import { stringify } from 'qs';

import { CONSTANTS } from './constant';
const { PLAYER_API_PATH } = CONSTANTS;


/**
 * Util function to add sorting button to select columns in the table
 */
export const addSorterToColumns = (columns = [], columnNames = [], _this) => {

    columns.forEach((column) => {
        if (columnNames.includes(column.title)) {
            column.onHeaderCell = _this.handleSort;
        }
    })
}

/**
 * Util function to add search button to select columns in the table
 */
export const addSearchToColumn = (columns = [], columnNames = [], _this) => {

    columns.forEach((column) => {
        if (columnNames.includes(column.title)) {
            column.filterDropdown = (<div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        _this.searchInput = node;
                    }}
                    placeholder={`Search Player`}
                    onPressEnter={_this.handleSearch}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={_this.handleSearch}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
              </Button>
                <Button onClick={_this.handleReset} size="small" style={{ width: 90 }}>
                    Reset
              </Button>
            </div>)

            column.filterIcon = (<Icon type="search" style={{ color: 'filtered' ? '#1890ff' : undefined }} />)
        }
    });

}

const _getsortOrder = (sort, sortOrder) => {
    switch (sort) {
        case 'Yds':
            return sortOrder.yrds;
        case 'Lng':
            return sortOrder.lng;
        case 'TD':
            return sortOrder.td;
        default:
            return 'asc'
    }
}

/**
 * 
 * @param {*} page  Page number of the pagination. null in case of bulk download for csv
 * @param {*} sort  Column name to be sorted
 * @param {*} search Query (player name) to search for
 * 
 * @returns url : FQDN of the get players api
 */
export const getURL = (page, sort, search, sortOrder) => {

    const _sortOrder = _getsortOrder(sort, sortOrder);
    const queryParams = {
        ...(page && { page }),
        ...(sort && { sort }),
        ...(search && { search }),
        ...(_sortOrder && { sortOrder: _sortOrder })
    };
    const url = `${PLAYER_API_PATH}${stringify(queryParams, { addQueryPrefix: true, encode: false })}`;
    return url;
}


/**
 * 
 * @param {*} column  Name of the column being used for sorting
 * @param {*} sortOrder Existing sort order (asc or desc) of this column
 */
export const getNewSortOrder = (column, sortOrder) => {

    let newSortOrder;
    switch (column.dataIndex) {
        case 'Yds':
            newSortOrder = (sortOrder.yrds === 'asc') ? 'desc' : 'asc';
            return {
                sort: column.dataIndex,
                sortOrder: {
                    yrds: newSortOrder
                }
            }
        case 'Lng':
            newSortOrder = (sortOrder.lng === 'asc') ? 'desc' : 'asc';
            return {
                sort: column.dataIndex,
                sortOrder: {
                    lng: newSortOrder
                }
            }
        case 'TD':
            newSortOrder = (sortOrder.td === 'asc') ? 'desc' : 'asc';
            return {
                sort: column.dataIndex,
                sortOrder: {
                    td: newSortOrder
                }
            }
    }
}
