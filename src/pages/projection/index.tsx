import { useState, useEffect } from 'react';
import { Switch, Table, Radio, message, Button, Tag } from 'antd';
import {
  getProjectorList,
  projectorEdit,
  projectorEditVideoSource,
} from '@/api/product.js';
import _ from 'lodash';
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
      title: '在线离线状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        // <Switch
        //   checkedChildren="开启"
        //   unCheckedChildren="关闭"
        //   checked={record.status}
        //   onChange={(status) => {
        //     onChangeStatus(status, record);
        //   }}
        // />

        <div>
          {record.status ? (
            <Tag color="#87d068">在线</Tag>
          ) : (
            <Tag color="#f50">离线</Tag>
          )}
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              onChangeStatus(0, record);
            }}
          >
            开机
          </Button>
          <Button
            danger
            style={{ marginLeft: '20px' }}
            onClick={() => {
              onChangeStatus(-1, record);
            }}
          >
            关机
          </Button>
        </div>
      ),
    },
    // {
    //   title: '视频源',
    //   dataIndex: 'videoSource',
    //   key: 'videoSource',
    //   render: (text, record) => (
    //     <Radio.Group
    //       onChange={(status) => {
    //         onChangeVideoSource(status.target.value, record);
    //       }}
    //       value={record.videoSource}
    //     >
    //       <Radio value={0}>HDMI1</Radio>
    //       <Radio value={1}>HDMI2</Radio>
    //       <Radio value={2}>DVI</Radio>
    //     </Radio.Group>
    //   ),
    // },
  ];
  useEffect(() => {
    _initGetData();

    const timer = setInterval(() => {
      _initNoloaddingGetData();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 1. 初始化数据
  const _initGetData = async () => {
    setLoaddingStatus(true);
    await getData();
    setLoaddingStatus(false);
  };
  const _initNoloaddingGetData = async () => {
    await getData();
  };
  // 2. 获取数据
  const getData = async () => {
    try {
      let res = await getProjectorList({});
      if (res.status === 200 && res.statusText === 'OK') {
        let data = _.cloneDeep(res.data.list);
        data.forEach((item) => {
          item.status = item.status === -1 ? false : true;

          if (
            item.videoSource !== 0 ||
            item.videoSource !== 1 ||
            item.videoSource !== 2
          ) {
            item.videoSource = '';
          }
        });
        setTableData(data);
      } else {
        message.error(res.statusText);
      }
    } catch (err) {
      message.error('服务器报错~');
    } finally {
    }
  };
  // 3. 单个修改开关机
  const onChangeStatus = async (status, record) => {
    console.log(record);

    setLoaddingStatus(true);
    let res = await projectorEdit({
      status: status,
      id: record.id,
    });
    console.log(res);

    if (res.status === 200 && res.statusText === 'OK') {
      setLoaddingStatus(false);
      message.success('操作成功~');
    }
    setLoaddingStatus(false);
  };
  // 4. 统一修改开关机
  const onAllChange = async (status) => {
    try {
      setLoaddingStatus(true);
      let res = await projectorEdit({
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
  // 5. 单个修改videoSource
  const onChangeVideoSource = async (status, record) => {
    try {
      setLoaddingStatus(true);
      let res = await projectorEditVideoSource({
        videoSource: status,
        id: record.id,
      });
      if (res.status === 200 && res.statusText === 'OK') {
        setLoaddingStatus(false);
        record.videoSource = status;
        setTableData([...tableData]);
        message.success('修改成功~');
      } else {
        message.error(res.statusText);
        getData();
      }
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
        rowKey={'id'}
        pagination={false}
      ></Table>
    </div>
  );
}
