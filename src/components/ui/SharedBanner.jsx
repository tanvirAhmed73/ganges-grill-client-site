export default function SharedBanner({ bannerTitle, description }) {
  return (
    <div className="relative mx-auto w-3/4">
      <img
        className="h-max"
        src="https://i.ibb.co/WDKvBvM/chef-special.jpg"
        alt=""
      />
      <div className="absolute text-left md:bottom-0">
        <h1 className="text-4xl font-semibold text-black">{bannerTitle}</h1>
        <p className="p-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
}
