function CoverImage({images}) {
  const quality = [];
  if(images.extraLarge) quality.push(images.extraLarge);
  if(images.large) quality.push(images.large);
  if(images.medium) quality.push(images.medium);

  const bgStyle = quality.map(value => `url(${value})`).join(', ');

  return (
    <>
      {(quality.length) && (<img src={quality.at(-1)} alt="Cover image." />)}
      <div className="image" style={{backgroundImage: bgStyle}}></div>
    </>
  )
}

export default CoverImage;