import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { humanFormatFromTimestamp } from "../../../shared/dateutils";
import defaultProfileImage from "/images/name.png";

const CommentBox = ({
  id,
  author,
  author_name,
  content,
  image,
  created_at,
  parent,
}) => {
  return (
    <article className={`comment ${parent ? "child" : ""}`}>
      <div className={"meta-data"}>
        <img
          className={"profile-image"}
          alt={author || "admin"}
          src={defaultProfileImage}
        />
        <a className={"profile-link"}>
          <span className={"author-name"}>
            {author || author_name || "admin"}
          </span>
          ・
          <time className={"created-at"}>
            {humanFormatFromTimestamp(created_at)}
          </time>
        </a>
      </div>

      {image && (
        <div className={"image"}>
          <img src={image} alt={"comment image"} />
        </div>
      )}

      <div
        className={"content"}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <style jsx>{styles}</style>
    </article>
  );
};

CommentBox.propTypes = {};

export default CommentBox;
