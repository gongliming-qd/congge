import { useState, useEffect } from 'react';
import './index.less';
export default function header(props: any) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div className="MindMapHeader">
      <div className="leftBox">
        <img className="logo" src={require('./img/logo.png')} />
        <span className="siteTitle">中控界面</span>
      </div>
    </div>
  );
}
