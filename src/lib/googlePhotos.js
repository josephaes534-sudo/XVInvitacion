export async function fetchGooglePhotos(albumUrl, apiKey) {
  try {
    const shareToken = extractShareToken(albumUrl)
    if (!shareToken) return []

    const response = await fetch(
      `https://photoslibrary.googleapis.com/v1/sharedAlbums/${shareToken}`,
      {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      }
    )

    if (!response.ok) return []

    const album = await response.json()

    const mediaResponse = await fetch(
      `https://photoslibrary.googleapis.com/v1/mediaItems:search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          albumId: album.id,
          pageSize: 50,
        }),
      }
    )

    if (!mediaResponse.ok) return []

    const media = await mediaResponse.json()
    return (media.mediaItems || []).map((item) => item.baseUrl)
  } catch {
    return []
  }
}

function extractShareToken(url) {
  if (!url) return null
  const match = url.match(/\/share\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}
