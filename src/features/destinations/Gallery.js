import React, { useState, useEffect } from 'react'
import Photo from './Photo'

const Gallery = ({ name }) => {
  const [gallery, setGallery] = useState([])
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('desktop')
  console.log(name, 'recieved NAME', status)

  const checkIt = () => {
    if (window.innerWidth < 1024 && window.innerWidth > 768) {
      setStatus('small-desk')
    } else if (window.innerWidth < 768) {
      setStatus('tablet')
    } else {
      setStatus('desktop')
    }
  }
  useEffect(() => {
    window.addEventListener('resize', checkIt)
    checkIt()
    return () => window.removeEventListener('resize', checkIt)
  }, [])
  useEffect(() => {
    getPhotos(page, 'old')
  }, [page])

  useEffect(() => {
    if (name) {
      setGallery([])
      getPhotos(1, 'new')
    }
  }, [name])

  const getPhotos = async (page, newT) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${name}&page=${page}&per_page=40&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
      )
      const data = await response.json()
      console.log(data.results, name)
      if (newT === 'new') {
        setGallery(data.results)
      } else if (status === 'small-desk') {
        setGallery((old) => {
          let Olen = Math.ceil(old.length)
          let Nlen = Math.ceil(data.results.length)
          return [
            ...old.slice(0, Olen / 2),
            ...data.results.slice(0, Nlen / 2),
            ...old.slice(Olen / 2, Olen),
            ...data.results.slice(Nlen / 2, Nlen),
          ]
        })
      } else if (status === 'tablet') {
        setGallery(data.results)
      } else {
        setGallery((old) => {
          let Olen = Math.ceil(old.length / 3)
          let Nlen = Math.ceil(data.results.length / 3)
          return [
            ...old.slice(0, Olen),
            ...data.results.slice(0, Nlen),
            ...old.slice(Olen, Olen * 2),
            ...data.results.slice(Nlen, Nlen * 2),
            ...old.slice(Olen * 2, Olen * 3),
            ...data.results.slice(Nlen * 2, Nlen * 3),
          ]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  let len = Math.ceil(gallery.length)
  return (
    <section className='gallery'>
      {status === 'desktop' && (
        <>
          <article>
            {gallery.slice(0, len / 3).map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
          <article>
            {gallery.slice(len / 3, (len / 3) * 2).map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
          <article>
            {gallery.slice((len / 3) * 2, (len / 3) * 3).map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
        </>
      )}

      {status === 'small-desk' && (
        <>
          <article>
            {gallery.slice(0, len / 2).map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
          <article>
            {gallery.slice(len / 2, len).map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
        </>
      )}
      {status === 'tablet' && (
        <>
          <article>
            {gallery.map((pic) => {
              const { id } = pic
              return <Photo item={pic} key={id} />
            })}
          </article>
        </>
      )}
      {page < 3 && (
        <button
          onClick={() => {
            if (page < 3) {
              setPage((old) => {
                return old + 1
              })
            }
          }}
          className='morePictures'
        >
          Load More
        </button>
      )}
    </section>
  )
}

export default Gallery
