'use client';

import React from 'react';
import Script from 'next/script';

type Props = {
  embedId: string;
  className?: string;
};

export default function GoogleReviewsCarousel({
  embedId,
  className = 'sk-ww-google-reviews',
}: Props): React.ReactElement {
  return (
    <>
      <div className={className} data-embed-id={embedId} />

      <Script
        src="https://widgets.sociablekit.com/google-reviews/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
