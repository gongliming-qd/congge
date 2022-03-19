import { useState, useEffect } from 'react';
import { Switch, Table, Spin } from 'antd';
import { getServerList } from '@/api/product.js';
import Loadding from '@/components/loading/index';
import './index.less';

export default function index() {
  let [tableData, setTableData] = useState([]);
  let [loaddingStatus, setLoaddingStatus] = useState(false);

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
    _initGetData();
  }, []);

  // 1. 初始化数据
  const _initGetData = async () => {
    setLoaddingStatus(true);
    let res = await getServerList({});
    if (res.status === 200 && res.statusText === 'OK') {
      setTableData(res.data.list);
    }
    setLoaddingStatus(false);
  };
  // 单个修改开关机
  const onChange = (status, record) => {
    record.status = status;
    setTableData([...tableData]);
  };

  return (
    <div className="projectPage">
      {loaddingStatus && <Loadding></Loadding>}
      <div className="controlButtons">
        <div className="controlButton">全开机</div>
        <div className="controlButton">全关机</div>
      </div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        className="projectTable"
        rowKey="id"
        pagination={false}
      ></Table>
    </div>
  );
}
