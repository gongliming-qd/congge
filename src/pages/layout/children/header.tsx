import './index.less';
export default function header() {
  return (
    <div className="MindMapHeader">
      <div className="leftBox">
        <img className="logo" src={require('./img/logo.png')} />
        <span className="siteTitle">PDbea</span>
      </div>
    </div>
  );
}
