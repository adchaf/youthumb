import { useState } from 'react';

const Index = () => {
  const [videoURL, setVideoURL] = useState('');
  const [thumbnailOptions, setThumbnailOptions] = useState([]);

  const getYouTubeThumbnail = (url) => {
    // ... Existing code to fetch and display thumbnail options ...
  };

  const downloadImage = (imageUrl) => {
    // Create an anchor element to trigger the download.
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'thumbnail.jpg'; // Set the desired file name here.

    // Trigger the download.
    link.click();

    // Clean up the anchor element.
    URL.revokeObjectURL(link.href);
  };

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

            <button onClick={() => downloadImage(thumbnailOptions.url)}>Download Image
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
                  onClick={() => downloadImage(option.url)} // Trigger download on button click
                >
                  Download Image
                </button>


            <button onClick={downloadImage}>Download Image</button>

                const downloadImage = (imageUrl) => {
                  // Create an anchor element to trigger the download.
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = 'thumbnail.jpg'; // Set the desired file name here.
                
                  // Trigger the download.
                  document.body.appendChild(link);
                  link.click();
                
                  // Clean up the anchor element.
                  document.body.removeChild(link);
                };


              </div>
            ))}
          </div>
        </div>
      )}

      {/* ... Existing code ... */}
    </div>
  );
};

export default Index;
