import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .confession-tiny-info {
    background: var(--theme-container-background, #fff);
    transition: opacity 0.35s ease-in;
    border: 1px solid #d6d6d6;
    border: 1px solid #d6d6d6;
    border: var(--theme-container-border, 1px solid #d6d6d6);
    box-shadow: 1px 1px 0px #c2c2c2;
    box-shadow: var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);
    border-radius: 3px;
    cursor: pointer;
    margin: auto auto 10px auto;
    position: relative;
    line-height: 32px;

    .featured-image {
      margin: 5px;

      img {
        width: 100%;
      }
    }

    .content {
      margin: 5px;
      
      .title {
        margin: 5px;
        font-size: 1.2rem;
      }
      
      .profile-image {
        width: 30px;
        margin-right: 10px;
      }

      .profile-link {
        position: absolute;
        margin-top: -10px;

        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1rem;
      }

      .cats {
        position: absolute;
        margin-left: 40px;
        margin-top: -33px;

        .comment {
          .comment-number {
            font-size: 1rem;
          }

          .comment-image {
            width: 15px;
            position: absolute;
            margin-left: 5px;
            margin-top: 9px;
          }
        }
      }
    }
  }


`
