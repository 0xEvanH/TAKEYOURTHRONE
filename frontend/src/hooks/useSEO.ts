import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE_NAME  = 'TYT Esports';
const BASE_URL   = 'https://takeyourthrone.com';
const DEFAULT_DESC = 'TYT - Professional esports organisation competing in Fortnite and Rainbow Six Siege. Est. 2025.';
const DEFAULT_IMG  = `${BASE_URL}/og-image.jpg`;

const setMeta = (name: string, content: string, attr = 'name') => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const useSEO = ({ title, description, url, image, type = 'website' }: SEOProps = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const desc      = description ?? DEFAULT_DESC;
    const canonical = url ? `${BASE_URL}${url}` : BASE_URL;
    const img       = image ?? DEFAULT_IMG;

    document.title = fullTitle;

    setMeta('description',         desc);
    setMeta('robots',              'index, follow');

    setMeta('og:title',            fullTitle,  'property');
    setMeta('og:description',      desc,        'property');
    setMeta('og:url',              canonical,   'property');
    setMeta('og:image',            img,         'property');
    setMeta('og:type',             type,        'property');
    setMeta('og:site_name',        SITE_NAME,   'property');

    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:site',        '@tyt_esport');
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image',       img);

    let canonical_el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical_el) {
      canonical_el = document.createElement('link');
      canonical_el.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical_el);
    }
    canonical_el.setAttribute('href', canonical);
  }, [title, description, url, image, type]);
};

export default useSEO;