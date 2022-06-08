import { useState, useEffect } from 'react';
import { Switch, Table, message } from 'antd';
import { getServerList, getServerEdit } from '@/api/product.js';
import _ from 'lodash';
import Loadding from '@/components/loading/index';
import './index.less';

export default function index() {
  let [tableData, setTableData] = useState([]);
  let [loaddingStatus, setLoaddingStatus] = useState(false);

  const tableColumns = [
    {
      title: '服务器',
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

  // 1. 初始化页面
  const _initGetData = async () => {
    setLoaddingStatus(true);
    await getData();
    setLoaddingStatus(false);
  };
  // 2. 获取数据
  const getData = async () => {
    try {
      let res = await getServerList({});
      if (res.status === 200 && res.statusText === 'OK') {
        let data = _.cloneDeep(res.data.list);
        data.forEach((item) => {
          item.status = item.status === -1 ? false : true;
        });
        setTableData(data);
      } else {
        message.error(res.statusText);
      }
    } catch {
      message.error('服务器报错~');
    } finally {
      setLoaddingStatus(false);
    }
  };
  // 3. 单个修改开关机
  const onChange = async (status, record) => {
    try {
      setLoaddingStatus(true);
      let res = await getServerEdit({
        status: status ? 0 : -1,
        id: record.id,
      });
      if (res.status === 200 && res.statusText === 'OK') {
        setLoaddingStatus(false);
        record.status = status;
        setTableData([...tableData]);
        message.success('修改成功~');
      } else {
        message.error(res.statusText);
        record.status = !status;
        setTableData([...tableData]);
      }
      setLoaddingStatus(false);
    } catch {
      message.error('服务器报错~');
    } finally {
      setLoaddingStatus(false);
    }
  };

  // 4. 统一修改开关机
  const onAllChange = async (status) => {
    try {
      setLoaddingStatus(true);
      let res = await getServerEdit({
        status,
        id: 0,
      });
      if (res.status === 200 && res.statusText === 'OK') {
        setLoaddingStatus(false);
        getData();
        message.success('修改成功~');
      } else {
        message.error(res.statusText);
      }
      setLoaddingStatus(false);
    } catch {
      message.error('服务器报错~');
      getData();
    } finally {
      setLoaddingStatus(false);
    }
  };

  return (
    <div className="projectPage">
      {loaddingStatus && <Loadding></Loadding>}
      <div className="controlButtons">
        <div
          className="controlButton"
          onClick={() => {
            onAllChange(0);
          }}
        >
          全开机
        </div>
        <div
          className="controlButton"
          onClick={() => {
            onAllChange(-1);
          }}
        >
          全关机
        </div>
        <div
          className="controlButton"
          onClick={() => {
            _initGetData();
          }}
        >
          刷新列表
        </div>
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
