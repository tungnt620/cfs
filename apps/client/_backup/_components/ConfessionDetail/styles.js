import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .confession-detail {
    font-size: 21px;
    line-height: 32px;
    width: 94%;
    margin-left: 3%;
    overflow-wrap: break-word;

    .featured-image {
      img {
        width: 100%;
      }

    }

    .meta-data {
      .profile-image {
        width: 40px;
        margin-right: 10px;
      }

      .profile-link {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.3rem;
        vertical-align: top;
        margin-top: 6px;
        display: inline-block;

        .created-at {
          font-weight: 100;
        }
      }
    }

    .cats {
      margin-bottom: 15px;

      .cat {
        //background-color: #008335;
      }

      .comment {
        margin-left: 20px;

        .comment-number {
        }

        .comment-image {
          width: 20px;
          position: absolute;
          margin-left: 5px;
          margin-top: 7px;
        }
      }
    }

    .content {
      white-space: pre-line;
      
      a {
        color: blue;
        text-decoration: underline
      }
    }


    .relative-categories {

      .cat {
        margin: 10px 5px;
      }

    }

    .comments {
      margin-top: 40px;
    }
  }

  @media only screen and (max-width: 1000px) {
    .confession-detail {
      font-size: 17.5px;
      line-height: 26px;

      .cats {

        .comment {
          .comment-image {
            margin-top: 4px;
          }
        }
      }
    }
  }


`
