import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .list-category-popular {
    margin: auto 3px 10px;
    
    
    .header-title {
      margin: 0 5px 1rem 5px;
    }

    .cat-tag {
    }
  }

  @media only screen and (min-width: 1250px) {
    .list-category-popular {
      display: none;
    }
  }


`

/*language=SCSS*/
export const globalStyle = css.global`

  .cat-tag {
    
    .am-tag-text {
      white-space: nowrap;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
  }

`
