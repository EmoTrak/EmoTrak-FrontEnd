export const useMeta = () => {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const ogImage = document.querySelector('meta[property="og:image"]');

  const updateTitle = (attributes: string) => {
    ogTitle?.getAttribute("content");
    ogTitle?.setAttribute("content", attributes);
  };

  const updateDescription = (attributes: string) => {
    ogDescription?.getAttribute("content");
    ogDescription?.setAttribute("content", attributes);
  };

  const updateImage = (attributes: string) => {
    ogImage?.getAttribute("content");
    ogImage?.setAttribute("content", attributes);
  };

  const defaultMeta = () => {
    ogTitle?.setAttribute("content", "EmoTrak");
    ogDescription?.setAttribute("content", "Emotion Tracking Diary");
    ogImage?.setAttribute(
      "content",
      "https://emotrak.vercel.app/static/media/EmoTrakLogo.bbed182dfe18e5b30034.png"
    );
  };

  return { updateTitle, updateDescription, updateImage, defaultMeta };
};
