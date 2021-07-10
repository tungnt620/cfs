import React from "react";
import styles from "./styles";
import ShortConfessionInfo from "../ShortConfessionInfo";

const ListShortConfessionInfo = ({
  confessions = [],
  loading,
  fetchMoreConfession,
}) => {
  return (
    <div className={"list-confession"}>
      {confessions.map((confession, index) => (
        <ShortConfessionInfo
          key={confession.id}
          confession={confession}
          index={index}
        />
      ))}
      <div className={"load-more-container"}>
        <button
          loading={loading}
          type={"primary"}
          onClick={fetchMoreConfession}
        >
          Tải thêm
        </button>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

ListShortConfessionInfo.propTypes = {};

export default ListShortConfessionInfo;
