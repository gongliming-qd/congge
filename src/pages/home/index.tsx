import { useState } from 'react';
import { OneclickCloseOrExpansion } from '@/api/product.js';
import { message } from 'antd';

import Loadding from '@/components/loading/index';

import './index.less';

export default function index() {
  let [loaddingStatus, setLoaddingStatus] = useState(false);

  const clickImport = async (status: Number) => {
    try {
      setLoaddingStatus(true);
      let res = await OneclickCloseOrExpansion({
        status,
      });
      if (res.status === 200 && res.statusText === 'OK') {
        setLoaddingStatus(false);
        message.success('操作成功~');
      } else {
        message.error(res.statusText);
      }
      setLoaddingStatus(false);
    } catch {
      message.error('服务器报错~');
    } finally {
      setLoaddingStatus(false);
    }
  };
  return (
    <div className="appendNew">
      {loaddingStatus && <Loadding></Loadding>}
      <div
        className="importBtn"
        onClick={() => {
          clickImport(0);
        }}
      >
        <div className="importIntro">
          <span className="topTntro">一键开展</span>
        </div>
      </div>
      <div
        className="appendBtn"
        onClick={() => {
          clickImport(-1);
        }}
      >
        <div className="importIntro">
          <span className="topTntro">一键闭展</span>
        </div>
      </div>
    </div>
  );
}
