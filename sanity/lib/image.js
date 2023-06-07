import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForFile = (source) => {
  if (source && source.asset) {
    const { asset } = source;
    
    // Check if the asset is a file
    if (asset._type === 'file') {
      const { url } = asset;
      return url;
    }
  }
  
  return null;
}