import React, { Component } from 'react';
import { Select } from 'antd';
import { Input } from 'antd';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      name: '',
    }
  }

  handleChange = (listUser) => {
    this.setState({ listUser })
  }
  
  handleChangeInput = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    const { users } = this.props;
    const { listUser, name } = this.state;

    return (
      <div className="select-box__content">
        <Input placeholder="Basic usage" className="select-box__name" onChange={this.handleChangeInput} />
        <Select
          className="select-box"
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={this.handleChange}
        >
          {
            users.map((item, index) => (
              <Select.Option key={index} value={item.uid}> {`${item.name}(${item.display})`} </Select.Option>
            ))
          }
        </Select>

        <button onClick={() => {this.props.submit(listUser, name)}} className="select-box__btn">Create Channel</button>
      </div>
    );
  }
}

export default SelectBox;