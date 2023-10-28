import { useState } from 'react';

const DOWNLOAD_ENDPOINT = "/api/image"

const makeGetYouTubeThumbnail = (setThumbnailOptions, setVideoURL) => (url) => {
  let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[1].length === 11) {
    const videoURL = match[1];
    const thumbnailBaseUrl = "http://img.youtube.com/vi/";

    const options = [
      { resolution: "HD (1280x720)", code: "maxresdefault" },
      { resolution: "SD (640x480)", code: "sddefault" },
      { resolution: "Normal (480x360)", code: "hqdefault" },
      { resolution: "Medium (320x180)", code: "mqdefault" },
      { resolution: "Low (120x90)", code: "default" },
    ];

    const thumbnailOptions = options.map((option) => ({
      resolution: option.resolution,
      url: `${thumbnailBaseUrl}${videoURL}/${option.code}.jpg`,
    }));

    setThumbnailOptions(thumbnailOptions);
    setVideoURL("");
  } else {
    setThumbnailOptions([]);
  }
};

const downloadImage = (url, name) => {
  const imageDlUrl = DOWNLOAD_ENDPOINT+"?url="+url
  console.log(imageDlUrl)
  fetch(imageDlUrl).then(resp => {
return resp.blob()
    })
        .then(blob => {
          console.log(blob)
            const url = window.URL.createObjectURL(blob);
          console.log(url)
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = name+".jpg";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('An error sorry'));
}

const Index = () => {
  const [videoURL, setVideoURL] = useState('');
  const [thumbnailOptions, setThumbnailOptions] = useState([]);

  const getYouTubeThumbnail = makeGetYouTubeThumbnail(setThumbnailOptions, setVideoURL);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Youtube Thumbnail Download hd</h1>
        <p className="text-gray-600 text-justify">
          {/* ... Existing code ... */}
        </p>
      </header>
      <div className="text-center">
        <input
          type="text"
          className="w-full md:w-1/2 px-4 py-2 border rounded"
          placeholder="Enter YouTube URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <button className="btn-blue mt-2" onClick={() => getYouTubeThumbnail(videoURL)}>
          Download Thumbnails
        </button>
      </div>

      {thumbnailOptions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Thumbnail Options</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {thumbnailOptions.map((option, index) => (
              <div key={index} className="thumbnail-option">
                <img src={option.url} alt={`Thumbnail ${index + 1}`} />
                <button
                  className="btn-blue mt-2"
                  onClick={() => downloadImage(option.url,option.code)} // Trigger download on button click
                >
                  Download Image
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
