import styles from './RoundedImage.module.css'

function RoundedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles.px75}`}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage