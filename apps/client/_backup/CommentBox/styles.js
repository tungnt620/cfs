import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .comment {
    border: 1px solid #dbdbdb;
    padding: 5px;
    margin-top: 10px;
    overflow-wrap: break-word;
    
    &.child {
      margin-left: 20px;
      margin-top: 5px;
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
        font-size: 1.1rem;
        vertical-align: top;
        margin-top: 6px;
        display: inline-block;
        
        .author-name {
          white-space: nowrap;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          float: left;
        }
        
        .created-at {
          font-weight: 100;
          font-size: 0.75em;
        }
      }
    }

    .content {
      
    }
  }
  
  @media only screen and (max-width: 1000px) {
    .confession-detail {
      font-size: 17.5px;
      line-height: 26px;
    }
  }

  
`
