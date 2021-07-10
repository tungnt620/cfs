import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import Link from 'next/link'

const ListCategory = ({ categories }) => {

  return (
    <div className={'list-category'}>
      <h2 className={'header-title'}>Tags</h2>
      {
        categories.map(cat => (
          <Link key={cat.id} href={`/category?slug=${cat.slug}`} as={`/category/${cat.slug}/`}>
            <a className={'cat'}>#{cat.name}</a>
          </Link>
        ))
      }

      <style jsx>{styles}</style>
    </div>
  )
}

ListCategory.propTypes = {}

export default ListCategory
