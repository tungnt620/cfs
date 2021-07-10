import css from "styled-jsx/css";

/*language=SCSS*/
export default css`
  .confession-short-info {
    background: var(--theme-container-background, #fff);
    transition: opacity 0.35s ease-in;
    border-bottom: var(--theme-container-border, 1px solid #d6d6d6);
    border-radius: 3px;
    width: 96%;
    margin: auto auto 30px;
    position: relative;

    .featured-image {
      margin: 5px;

      img {
        max-width: 100%;
      }
    }

    .content {
      margin: 5px;

      .profile-image {
        width: 50px;
        margin-right: 10px;
      }

      .profile-link {
        position: absolute;

        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.1rem;
      }

      .cats {
        position: absolute;
        margin-left: 60px;
        margin-top: -25px;

        .cat {
          white-space: nowrap;
          max-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          float: left;
        }

        .comment {
          margin-left: 20px;

          .comment-number {
          }

          .comment-image {
            width: 20px;
            position: absolute;
            margin-left: 5px;
          }
        }
      }
    }
  }
`;
