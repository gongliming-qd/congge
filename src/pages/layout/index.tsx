import { Table, Popconfirm, Button } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import './index.less';
import HomeHeader from './children/header';

export default function index(props) {
  let [defaultActive, setActive] = useState('home');

  const routerRepeace = (item) => {
    setActive(item);
    history.push('/list');
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
              <i className="menuIconAdd"></i>
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
              <i className="menuIconMap"></i>
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
              <i className="menuIconTrash"></i>
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