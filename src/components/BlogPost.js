import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router';

// Youtube API v3 Key
const API = ''

export default function BlogPost({ data }) {
    // State
  const [player, setPlayer] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState("");

  /// API RELATED
  const params = useParams();
  const post = data.posts.find((dataItem) => dataItem.id === params.id);
  const youtubeID = post.url.split('v=')[1];
  console.log(youtubeID)
  const onReady = (e) => {
    setPlayer(e.target);
  };
  const onPlayHandler = () => {
    player.playVideo();
  };
  const onPauseHandler = () => {
    player.pauseVideo();
  };
  const onSearchHandler = async (e) => {
     const keyword = userSearch;
     const fetchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet,id&q=${keyword}&maxResults=5`;
     fetch(fetchUrl).then((response) => response.json()).then((resJson) => {
        const result = resJson.items.map(doc=>({
            ...doc,
            Videolink: "https://www.youtube.com/embed/"+doc.id.videoId
        }))
        setAllVideos(result)
        setActiveVideoId(result[0].id.videoId);
        setUserSearch("");
  })
}



useEffect(() => {

})
  
  console.log(allVideos)
  console.log()
  return (
    <div className="blog">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="player">
      <YouTube
      videoId={activeVideoId}
      onReady={onReady}
    />
      </div>
      <button onClick={onPlayHandler} className="btn">
        Play
      </button>
      <button onClick={onPauseHandler} className="btn">
        Pause
      </button>
      <input onChange={(e) => setUserSearch(e.target.value)} value={userSearch}></input>
      <button onClick={onSearchHandler} className="btn">
          Search
      </button>
    </div>
  );
}
