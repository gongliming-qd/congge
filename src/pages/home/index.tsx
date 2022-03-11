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
        <img src={require('@/assets/imgs/append_import.svg')} />
        <div className="importIntro">
          <span className="topTntro">Import file</span>
          <span className="bottomIntro">PDbea</span>
        </div>
      </div>
      <div
        className="appendBtn"
        onClick={() => {
          clickImport();
        }}
      >
        <img src={require('@/assets/imgs/append_add.png')} />
        <div className="importIntro">
          <span className="topTntro">Add New</span>
          <span className="bottomIntro">Here we go now!</span>
        </div>
      </div>
    </div>
  );
}
