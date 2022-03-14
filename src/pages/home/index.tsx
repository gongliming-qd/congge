import React from 'react';
import './index.less';

export default function index() {
  const clickImport = () => {};
  return (
    <div className="appendNew">
      <div
        className="importBtn"
        onClick={() => {
          clickImport();
        }}
      >
        <div className="importIntro">
          <span className="topTntro">一键开展</span>
        </div>
      </div>
      <div
        className="appendBtn"
        onClick={() => {
          clickImport();
        }}
      >
        <div className="importIntro">
          <span className="topTntro">一键闭展</span>
        </div>
      </div>
    </div>
  );
}
