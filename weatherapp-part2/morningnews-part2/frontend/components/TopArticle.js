import styles from '../styles/Toparticle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addBookmark, removeBookmark } from '../reducers/bookmarks'

function TopArticle(props) {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state) => state.bookmarks.value)
  console.log('bookmarks dans TopArticle', bookmarks)

  const handleBookmarkClick = () => {
    if (props.isBookmarked) {
      dispatch(removeBookmark(props))
    } else {
      dispatch(addBookmark(props))
    }
  }

  //.
  //   const add = (article) => {
  //     dispatch(addBookmark(article))
  //   }
  //   const remove = (article) => {
  //     dispatch(removeBookmark(article))
  //   }

  let iconStyle = {}
  if (props.isBookmarked) {
    iconStyle = { color: '#E9BE59' }
  }
  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          icon={faBookmark}
          className={styles.bookmarkIcon}
          onClick={() => handleBookmarkClick()}
          style={iconStyle}
        />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default TopArticle
