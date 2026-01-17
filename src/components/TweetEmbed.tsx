import { useEffect, useRef } from "react";

interface prop{
  url:string,
}

// TypeScript declaration for Twitter widgets
declare global {
  interface Window {
    twttr?: {
      ready: (callback: (twttr: any) => void) => void;
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

// Global script loading state
let scriptPromise: Promise<void> | null = null;

const loadTwitterScript = (): Promise<void> => {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (existingScript && window.twttr) {
      resolve();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject());
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });

  return scriptPromise;
};

// Function to normalize Twitter URL - convert x.com to twitter.com and extract tweet ID
const normalizeTwitterUrl = (url: string): string => {
  if (!url || !url.trim()) return '';

  try {
    const parsed = new URL(url.trim());
    
    // Check if it's a Twitter/X URL
    if (parsed.hostname.includes("twitter.com") || parsed.hostname.includes("x.com")) {
      // Extract the path parts
      const pathParts = parsed.pathname.split("/").filter(part => part);
      
      // Find the status ID (long numeric string)
      const statusId = pathParts.find(part => /^\d{10,}$/.test(part));
      
      if (statusId) {
        // Find username (usually before 'status')
        const statusIndex = pathParts.indexOf('status');
        const username = statusIndex > 0 ? pathParts[statusIndex - 1] : pathParts[0];
        
        // Construct proper twitter.com URL with ref_src parameter
        return `https://twitter.com/${username}/status/${statusId}?ref_src=twsrc%5Etfw`;
      }
    }
    
    // If we can't parse it, return original URL
    return url.trim();
  } catch (error) {
    // If URL parsing fails, return original URL
    return url.trim();
  }
};

const TweetEmbed = ({url}:prop) => {
  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  
  // Normalize the URL: convert x.com to twitter.com and ensure proper format
  const normalizedUrl = normalizeTwitterUrl(url);

  useEffect(() => {
    let isMounted = true;

    const initializeWidget = async () => {
      try {
        // Load the Twitter script
        await loadTwitterScript();

        if (!isMounted) return;

        // Wait for twttr to be ready
        if (window.twttr && window.twttr.ready) {
          window.twttr.ready((twttr: any) => {
            if (!isMounted) return;
            
            // Load all widgets on the page (Twitter's recommended approach)
            setTimeout(() => {
              if (isMounted && twttr.widgets) {
                // Load all twitter-tweet widgets on the page
                twttr.widgets.load();
              }
            }, 100);
          });
        } else {
          // Fallback: try loading after delay
          setTimeout(() => {
            if (isMounted && window.twttr && window.twttr.widgets) {
              window.twttr.widgets.load();
            }
          }, 500);
        }
      } catch (error) {
        console.error('Failed to load Twitter widgets:', error);
      }
    };

    // Initialize after a delay to ensure blockquote is in DOM
    const timeoutId = setTimeout(initializeWidget, 200);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [normalizedUrl]);

  if (!normalizedUrl) {
    return <div>Invalid tweet URL</div>;
  }

  return (
    <blockquote 
      ref={blockquoteRef}
      className="twitter-tweet" 
      data-theme="light" 
      data-dnt="true"
    >
      <a href={normalizedUrl}></a>
    </blockquote>
  );
};

export default TweetEmbed;
