export function isBrowser() {
  return typeof window !== `undefined`;
}

export function slugify(string) {
  return string
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function pluralize(string) {
  return string.endsWith('s') ? `${string}'` : `${string}'s`;
}

export function truncateString(text, charLimit, flag) {
  if (flag) {
    return <span>{text}</span>;
  }
  if (typeof text === 'undefined' || text === null) {
    return '';
  }
  if (text.length <= charLimit) {
    return <span>{text}</span>;
  } else {
    const truncatedText = text.substring(0, charLimit);
    return (
      <span>
        {`${truncatedText.substr(
          0,
          Math.min(truncatedText.length, truncatedText.lastIndexOf(' '))
        )}...`}
        <span style={{ color: '#828181', cursor: 'pointer' }}>more</span>
      </span>
    );
  }
}

export function getHostnameFromRegex(url) {
  // run against regex
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
}

export async function uploadFileToCloudinary(image) {
  const cloudinaryUploadApiUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append('file', image);
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudinaryData = await fetch(cloudinaryUploadApiUrl, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());

  return cloudinaryData;
}

export async function getCloudinaryImageUrl(image) {
  const imageExistsInCloudinary =
    getHostnameFromRegex(image) === 'res.cloudinary.com';

  if (!imageExistsInCloudinary) {
    const cloudinaryImageData = await uploadFileToCloudinary(image);

    return cloudinaryImageData.secure_url;
  } else {
    return image;
  }
}
