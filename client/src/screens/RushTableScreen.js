import 'antd/dist/antd.css';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { Parser } from 'json2csv';
import React from 'react';
import { Table, Pagination, Button } from 'antd';

import Player from '../table-config/columns';
import { addSorterToColumns, addSearchToColumn, getURL } from '../utils';
import { CONSTANTS } from '../constant';

const { BASE_PORT, BASE_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TOTAL, PROTOCOL } = CONSTANTS;
const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}://${BASE_URL}:${BASE_PORT}`
});

class RushTableScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      columns: Player,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        total: DEFAULT_TOTAL
      },
      sort: null,
      searchInput: null,
      csvData: []
    };
  }

  componentDidMount() {
    const { pagination: { page } } = this.state;

    // Loadidng the first page of players
    this.fetchPlayerList(page);

    //Adding search and sort functionality to table
    addSorterToColumns(this.state.columns, ['Yrds', 'Lng', 'TD'], this);
    addSearchToColumn(this.state.columns, ['Player'], this);
  }

  // Various Handlers
  handleSort = (column) => {
    return {
      onClick: async () => {
        try {
          await this.setState({
            sort: column.dataIndex
          })
          await this.fetchPlayerList()
        }
        catch (error) {
          console.log(error);
        }
      }
    };
  }

  handleSearch = async () => {

    try {
      await this.setState({
        pagination: {
          page: 1
        },
        searchInput: this.searchInput.state.value
      })
      await this.fetchPlayerList()
    } catch (error) {
      console.log(error)
    }
  }

  handleReset = async () => {

    try {
      await this.setState({
        searchInput: ''
      })
      await this.fetchPlayerList()
    }
    catch (error) {
      console.log(error);
    }
  }

  handlePageChange = async (page) => {

    try {
      await this.setState({
        pagination: {
          page: parseInt(page)
        }
      });
      await this.fetchPlayerList();
    } catch (error) {
      console.log(error);
    }
  }

  handleCSVDownload = async () => {

    try {
      const url = getURL(null, this.state.sort, this.state.searchInput)
      const { data } = await axiosInstance.get(url)
      const fields = ["Player", "Team", "Pos", "Att", "Att/G", "Yds", "Avg", "Yds/G", "TD", "Lng", "1st", "1st%", "20+", "40+", "FUM"]
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(data.players);
      await this.setState({
        csvData: csv
      })
      this.refs.csv.link.click();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Method to make network call
   */
  fetchPlayerList = async () => {
    try {
      const url = getURL(this.state.pagination.page, this.state.sort, this.state.searchInput)
      const { data } = await axiosInstance.get(url)
      await this.setState({
        players: data.players,
        pagination: data.pagination
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const { columns, players, pagination, csvData } = this.state;
    const { page, total } = pagination;
    return (
      <div style={{margin: '10px'}}>
        <Table dataSource={players} columns={columns} pagination={false} />
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
          <Pagination onChange={this.handlePageChange} total={total} defaultCurrent={page} current={page} />
          <Button onClick={this.handleCSVDownload}>Export CSV</Button>
          <CSVLink
            ref="csv"
            data={csvData}
            style={{ display: 'none' }} />
        </div>

      </div>
    );
  }
}

export default RushTableScreen;
