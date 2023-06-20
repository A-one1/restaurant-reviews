import React, { memo, useState } from "react";

const GoogleMaps = memo(({ address }) => {

  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-image hover-overlay ripple">
      {isLoading && <div className="spinner-border" role="status"></div>}
      <iframe
        title={address}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          address
        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        style={{ border: 0, height: "200px", width: "100%" }}
        allowFullScreen
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
});

export default GoogleMaps;
