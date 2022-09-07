

const Photo = ({ item }) => {
  const {
    alt_description,

    links: { download, download_location, html, self },
    urls,
    user: { name, links },
  } = item
  const { full, raw, regular, small, small_s3, thumb } = urls
  return (
    <div className='photoContainer'>
      <img loading='lazy' src={regular} alt={alt_description} />
      <span>
        Photo by{' '}
        <a
          target='_blank'
          href={`${links.html}?utm_source=TravelOut&utm_medium=referral`}
          rel='noreferrer'
        >
          {name}
        </a>{' '}
        on{' '}
        <a
          target='_blank'
          href='https://unsplash.com/?utm_source=TravelOut&utm_medium=referral'
          rel='noreferrer'
        >
          Unsplash
        </a>
      </span>
    </div>
  )
}

export default Photo
