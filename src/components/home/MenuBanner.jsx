import Title from "@/components/ui/Title";

export default function MenuBanner() {
  return (
    <div>
      <div className="mx-auto w-full">
        <p className="mt-5 text-center text-orange-600 md:text-md">
          &quot;---Check it out---&quot;
        </p>
        <p className="text-center text-black md:text-3xl">
          &apos;FROM OUR MENU&apos;
        </p>
      </div>
      <div className="mx-auto mb-10 w-3/4">
        <img className="h-max" src="https://i.ibb.co/L5mD67j/01.jpg" alt="" />
      </div>
    </div>
  );
}
