import { useEffect } from "react";

interface prop{
  url:string,
}


const TweetEmbed = ({url}:prop) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote className="twitter-tweet w-68">
      <a href={url}></a>
    </blockquote>
  );
};

export default TweetEmbed;
