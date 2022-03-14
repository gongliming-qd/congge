import { useState, useEffect } from 'react';
import { RadarChartOutlined } from '@ant-design/icons';
import './index.less';
export default function header(props: any) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div className="MindMapHeader">
      <div className="leftBox">
        <div className="logo">
          <RadarChartOutlined />
        </div>
        <span className="siteTitle">中控后台管理系统</span>
      </div>
    </div>
  );
}
