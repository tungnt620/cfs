import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import Link from "next/link";
import { humanFormatFromTimestamp } from "../../../shared/dateutils";
import defaultProfileImage from "/images/name.png";
import commentsImage from "/images/comments.png";
import CommentBox from "../CommentBox";
import TinyConfessionInfo from "../TinyConfessionInfo";
import { generateEmbedFB } from "../../../shared/helpers";

const ConfessionDetail = ({ confession = {} }) => {
  const {
    id,
    image,
    title,
    author,
    totalComment,
    categories = [],
    content,
    created_at,
    comments,
    relativeConfessions = [],
    relativeCategories = [],
  } = confession || {};

  const [commentIDChildren, setCommentIDChildren] = useState({});
  const [formattedContent, setFormattedContent] = useState("");
  useEffect(() => {
    if (comments && comments.length > 0) {
      setCommentIDChildren(
        comments.reduce((map, comment) => {
          const commentParent = comment.parent;
          if (commentParent) {
            if (!map[commentParent]) map[commentParent] = [];
            map[commentParent].push(comment);
          }
          return map;
        }, {})
      );
    }
  }, [comments]);

  useEffect(() => {
    if (content) {
      setFormattedContent(generateEmbedFB(content));
    }
  }, [content]);

  return (
    <article className={"confession-detail"}>
      {image && (
        <div className={"featured-image"}>
          <img src={image} alt={title} />
        </div>
      )}

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
      </div>

      <div className={"cats"}>
        {categories.map((cat) => (
          <div key={cat.id} className={"cat"}>
            <Link
              key={cat.slug}
              href={`/category?slug=${cat.slug}`}
              as={`/category/${cat.slug}/`}
            >
              <a>#{cat.name}</a>
            </Link>
          </div>
        ))}

        <a href={"#confession-detail-comments"} className={"comment"}>
          <span className={"comment-number"}>{totalComment}</span>
          <img
            className={"comment-image"}
            alt={"comment"}
            src={commentsImage}
          />
        </a>
      </div>

      <div
        className={"content"}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></div>

      <div className={"relative-confessions"}>
        <h2>Confession khác có thể bạn thích</h2>
        {relativeConfessions.slice(0, 3).map((confession, index) => (
          <TinyConfessionInfo
            key={confession.id}
            confession={confession}
            index={index}
          />
        ))}
      </div>

      <div className={"relative-categories"}>
        <h2>Tags khác có thể bạn thích</h2>
        {relativeCategories.map((cat) => (
          <div key={cat.id} className={"cat"}>
            <Link
              key={cat.slug}
              href={`/category?slug=${cat.slug}`}
              as={`/category/${cat.slug}/`}
            >
              <a>#{cat.name}</a>
            </Link>
          </div>
        ))}
      </div>

      <div id={"confession-detail-comments"} className={"comments"}>
        <h2>Bình luận</h2>
        {(comments || []).map((comment) => {
          let commentComponents = [];
          if (!comment.parent) {
            commentComponents = [<CommentBox key={comment.id} {...comment} />];
            const commentChildren = (
              commentIDChildren[comment.id] || []
            ).map((comment) => <CommentBox key={comment.id} {...comment} />);
            commentComponents = [...commentComponents, ...commentChildren];
          }

          return commentComponents;
        })}
      </div>

      <style jsx>{styles}</style>
    </article>
  );
};

ConfessionDetail.propTypes = {};

export default ConfessionDetail;
