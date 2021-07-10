import css from 'styled-jsx/css'

/*language=SCSS*/
export default css`
  .list-category {
    .header-title {
      margin: 0 0 1rem 0;
    }

    .cat-tag {
      margin: 5px;
    }
  }

`

/*language=SCSS*/
export const globalStyle = css.global`

  .cat-tag {
    margin: 5px;
    
    .am-tag-text {
      white-space: nowrap;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
  }

`
