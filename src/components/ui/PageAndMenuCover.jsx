export default function PageAndMenuCover({ img, title, description }) {
  return (
    <div
      className="relative h-[300px] overflow-hidden md:h-[450px] lg:h-[500px]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex h-full items-center justify-center px-4 text-center text-white">
        <div className="max-w-xl">
          <h1 className="mb-5 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
