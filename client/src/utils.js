

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


/**
 * 
 * @param {*} page  Page number of the pagination. null in case of bulk download for csv
 * @param {*} sort  Column name to be sorted
 * @param {*} search Query (player name) to search for
 * 
 * @returns url : FQDN of the get players api
 */
export const getURL = (page, sort, search) => {
    const queryParams = {
        ...(page && { page }),
        ...(sort && { sort }),
        ...(search && { search })
    };
    const url = `${PLAYER_API_PATH}${stringify(queryParams, { addQueryPrefix: true, encode: false })}`;
    return url;
}
