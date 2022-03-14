import { useState } from 'react';
import { Switch, Table, Radio } from 'antd';
const { Column } = Table;
import './index.less';

export default function index() {
  let [tableData, setTableData] = useState([
    {
      key: 1,
      id: 1,
      name: 'glm',
      remark: '1',
      ip: '192.168.1.1',
      status: true,
      videoSource: 1,
    },
  ]);
  const tableColumns = [
    {
      title: '投影机',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '开机状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={record.status}
          onChange={(status) => {
            onChange(status, record, 'status');
          }}
        />
      ),
    },
    {
      title: '视频源',
      dataIndex: 'videoSource',
      key: 'videoSource',
      render: (text, record) => (
        <Radio.Group
          onChange={(status) => {
            onChange(status.target.value, record, 'videoSource');
          }}
          value={record.videoSource}
        >
          <Radio value={1}>无</Radio>
          <Radio value={2}>类型1</Radio>
          <Radio value={3}>类型1</Radio>
        </Radio.Group>
      ),
    },
  ];
  const onChange = (value, record, key) => {
    console.log(value);
    console.log(record);
    console.log(key);

    record[key] = value;
    setTableData([...tableData]);

    console.log(tableData);
  };
  return (
    <div className="projectPage">
      <div className="controlButtons">
        <div className="controlButton">全开机</div>
        <div className="controlButton">全关机</div>
      </div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        className="projectTable"
      >
        {tableColumns.map((column) => {
          <Column
            title={column.title}
            dataIndex={column.dataIndex}
            key={column.key}
          />;
        })}
      </Table>
    </div>
  );
}
