import Image from 'next/image'
import styles from '../styles/Article.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import { addBookmark, removeBookmark } from '../reducers/bookmarks'

function Article(props) {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state) => state.bookmarks.value)

  const handleBookmarkClick = () => {
    if (props.isBookmarked) {
      dispatch(removeBookmark(props))
    } else {
      dispatch(addBookmark(props))
    }
  }

  let iconStyle = { color: '#000000' }
  if (props.isBookmarked) {
    iconStyle = { color: '#E9BE59' }
  }
  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3>{props.title}</h3>
        <FontAwesomeIcon
          icon={faBookmark}
          className={styles.bookmarkIcon}
          onClick={() => handleBookmarkClick()}
          style={iconStyle}
        />
      </div>
      <h4 style={{ textAlign: 'right' }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={314}
      />
      <p>{props.description}</p>
    </div>
  )
}

export default Article
