import { useState, useEffect } from 'react';
import { Switch, Table } from 'antd';
const { Column } = Table;
import './index.less';

export default function index() {
  let [tableData, setTableData] = useState([
    {
      id: 1,
      name: 'glm',
      remark: '备注',
      ip: '192.168.1.1',
      status: true,
      children: [{}],
    },
    { id: 2, name: '帅哥', remark: '1', ip: '192.168.1.1', status: true },
  ]);
  let [testData, setTestData] = useState({
    a: 1,
    b: {
      c: `1`,
    },
  });
  const tableColumns = [
    {
      title: '投影机',
      key: 'name',
    },
    {
      title: '备注',
      key: 'remark',
    },
    {
      title: 'ip',
      key: 'ip',
    },
    {
      title: '开机状态',
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

  useEffect(() => {
    console.log(testData.b.c);
  }, [testData.b.c]);

  const onChange = (status, record) => {
    testData.b.c = 2;
    setTestData({
      a: 2,
      b: {
        c: `1`,
      },
    });

    setTestData((val) => {
      let newVal = val;
      return newVal;
    });
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
        rowKey="id"
      ></Table>
    </div>
  );
}
