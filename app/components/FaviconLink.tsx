'use client';

import { useEffect } from 'react';

export default function FaviconLink() {
  useEffect(() => {
    // Dynamically set favicon with correct basePath
    const basePath = window.location.pathname.startsWith('/oss-catalog') ? '/oss-catalog' : '';
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = `${basePath}/favicon.ico`;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = `${basePath}/favicon.ico`;
      document.head.appendChild(newLink);
    }
  }, []);

  return null;
}
