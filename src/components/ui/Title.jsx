export default function Title({ title, subtitle }) {
  return (
    <div>
      <p className="mt-5 text-center text-orange-600 md:text-md">{title}</p>
      <p className="mb-4 text-center text-3xl text-black md:text-3xl">
        {subtitle}
      </p>
    </div>
  );
}
