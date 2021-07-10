import React from "react";
import styles from "./styles";
import Link from "next/link";
import { humanFormatFromTimestamp } from "../../../shared/dateutils";
import defaultProfileImage from "/images/name.png";
import commentsImage from "/images/comments.png";

const TinyConfessionInfo = ({ confession, index }) => {
  let { image, slug, title, created_at, totalComment, author } = confession;

  return (
    <article className={"confession-tiny-info"}>
      <div className={"content"}>
        <h3 className={"title"}>
          <Link href={`/confession?slug=${slug}`} as={`/${slug}/`}>
            <a>{title}</a>
          </Link>
        </h3>
        <div className={"meta-data"}>
          <img
            className={"profile-image"}
            alt={author || "admin"}
            src={defaultProfileImage}
          />
          <a className={"profile-link"}>
            {author || "admin"}・
            <time className={"created-at"}>
              {humanFormatFromTimestamp(created_at)}
            </time>
          </a>

          <div className={"cats"}>
            <Link
              href={`/confession/#confession-detail-comments?slug=${slug}`}
              as={`/${slug}/#confession-detail-comments`}
            >
              <a className={"comment"}>
                <span className={"comment-number"}>{totalComment}</span>
                <img
                  className={"comment-image"}
                  alt={"comment"}
                  src={commentsImage}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </article>
  );
};

TinyConfessionInfo.propTypes = {};

export default TinyConfessionInfo;
