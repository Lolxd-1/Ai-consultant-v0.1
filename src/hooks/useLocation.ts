import { useState, useEffect } from 'react';

export function useLocation() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const url = new URL(anchor.href);
        window.history.pushState({}, '', url.pathname);
        setPathname(url.pathname);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('popstate', () => setPathname(window.location.pathname));

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', () => setPathname(window.location.pathname));
    };
  }, []);

  return { pathname };
}