import { Table, Popconfirm, Button } from 'antd';
import {
  ReadOutlined,
  DingtalkOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { history } from 'umi';
import './index.less';
import { getProductList } from '@/api/product.js';
import HomeHeader from './children/header';

export default function index(props: any) {
  let [defaultActive, setActive] = useState(props.location.pathname.substr(1));

  const _initGetData = async () => {
    let res = await getProductList({
      username: 'gongliming@tenorshare.cn',
      password: '88888888',
    });
    console.log(res);
  };
  useEffect(() => {});
  const routerRepeace = (item) => {
    setActive(item);
    history.push(`/${item}`);
    _initGetData();
  };

  return (
    <div className="home">
      <div className="header">
        <HomeHeader></HomeHeader>
      </div>
      <div className="centerBody">
        <div className="menu">
          <div
            className={`itemMenu ${defaultActive === 'home' ? 'active' : null}`}
            onClick={() => {
              routerRepeace('home');
            }}
          >
            <span className="iconSetWidth">
              <BankOutlined />
            </span>
            <span>home</span>
          </div>
          <div
            className={`itemMenu ${
              defaultActive === 'server' ? 'active' : null
            }`}
            onClick={() => {
              routerRepeace('server');
            }}
          >
            <span className="iconSetWidth">
              <DingtalkOutlined />
            </span>
            <span>server</span>
          </div>
          <div
            className={`itemMenu ${
              defaultActive === 'projection' ? 'active' : null
            }`}
            onClick={() => {
              routerRepeace('projection');
            }}
          >
            <span className="iconSetWidth">
              <ReadOutlined />
            </span>
            <span>projection</span>
          </div>
        </div>
        <div className="content">
          <div className="showContend">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
