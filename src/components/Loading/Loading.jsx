// loading compoent

import "./Loading.css";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
