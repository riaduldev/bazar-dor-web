
import Image from "next/image";
import Link from "next/link";

const todayDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date());

const BannerSection = () => {
  return (
    <section className="bg-base-200 px-4 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">

        {/* Left Content */}
        <div className="order-2 space-y-5 text-center md:order-1 md:text-left">
          <p className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {todayDate}
          </p>

          <h2 className="text-3xl leading-tight font-bold text-base-content sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-7 text-base-content/70 sm:text-base md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div>
            <Link
              href="#সব-পণ্য"
              className="btn btn-success px-7 text-white shadow-md transition hover:scale-105"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/bazar-hero.png"
            alt="BazarDor Banner"
            width={800}
            height={400}
            priority
            className="h-auto w-full max-w-md object-contain sm:max-w-lg md:max-w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default BannerSection;
