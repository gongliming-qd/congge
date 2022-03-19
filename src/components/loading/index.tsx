import React from 'react';
import { Spin } from 'antd';
import './index.less';

export default function index() {
  return (
    <div className="loadding">
      <Spin tip="Loading..."></Spin>
    </div>
  );
}
