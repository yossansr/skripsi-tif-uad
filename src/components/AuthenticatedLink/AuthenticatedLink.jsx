/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { createRef } from 'react';

export default function AuthenticatedLink({ url, filename, children }) {
  const link = createRef();
  const baseUrl = 'http://localhost:4444';
  const token = localStorage.getItem('token');

  const handleAction = async () => {
    if (link.current.href) { return; }

    const result = await fetch(baseUrl + url, {
      headers: { token },
    });

    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);

    link.current.href = href;

    window.open(link.current);
  };

  return (
    <>
      <a role="button" ref={link} onClick={handleAction}>{children}</a>
    </>
  );
}
