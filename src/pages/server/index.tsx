import { useState } from 'react';
import { Switch, Table } from 'antd';
const { Column } = Table;
import './index.less';

export default function index() {
  let [tableData, setTableData] = useState([
    { id: 1, name: 'glm', remark: '1', ip: '192.168.1.1', status: true },
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
            onChange(status, record);
          }}
        />
      ),
    },
  ];
  const onChange = (status, record) => {
    record.status = status;
    setTableData([...tableData]);
    console.log(tableData[0].status);
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
