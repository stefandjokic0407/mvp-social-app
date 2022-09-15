import Head from 'next/head';

interface ISeoProps {
  author: string;
  description: string;
  keywords?: string[];
  image: string;
  title: string;
  url: string;
}

export default function Seo({
  author = '',
  description = 'Create, request, and share lists with people you trust.',
  keywords = [
    'totyms',
    'totym',
    'totymshare',
    'totym sharing',
    'totym sharing app',
  ],
  image = 'https://res.cloudinary.com/di9t1lu8j/image/upload/v1642478333/logos/TYM-Logo-Tagline-whitebg-social-share_xcul5m.jpg',
  title = 'totym.com | share the way',
  url,
}: ISeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="title" content={title} key="title" />
      {description && (
        <meta name="description" content={description} key="desc" />
      )}
      <link rel="icon" href="/favicon.ico" />
      {url && <link rel="canonical" href={url} />}

      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}

      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />

      <meta property="twitter:url" content={url} key="twurl" />
      <meta property="twitter:title" content={title} key="twtitle" />
      <meta property="twitter:description" content={description} key="twdesc" />

      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:image" content={image} key="twimage" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta itemProp="image" content={image} />
      <meta content={image} name="image" />
    </Head>
  );
}
