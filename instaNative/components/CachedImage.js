import React, { useEffect, useState, useRef } from 'react'

import { Image } from 'react-native'

import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'

const CachedImage = props => {
  const { source: { uri }, cacheKey } = props
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

  const [imgURI, setImgURI] = useState(filesystemURI)

  const componentIsMounted = useRef(true)

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        const metadata = await FileSystem.getInfoAsync(fileURI)
        if (!metadata.exists) {
          if (componentIsMounted.current) {
            setImgURI(null)
            await FileSystem.downloadAsync(
              uri,
              fileURI
            )
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI)
          }
        }
      } catch (err) {
        console.log()
        setImgURI(uri)
      }
    }

    loadImage({ fileURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return (
    <Image
      {...props}
      source={{
        uri: imgURI,
      }}
    />
  )
}

CachedImage.propTypes = {
  source: PropTypes.object.isRequired,
  cacheKey: PropTypes.string.isRequired,
}

export default CachedImage