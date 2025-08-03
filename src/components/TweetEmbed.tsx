import { useEffect } from "react";

const TweetEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href="https://twitter.com/BowesChay/status/1951423906881138769"></a>
    </blockquote>
  );
};

export default TweetEmbed;
