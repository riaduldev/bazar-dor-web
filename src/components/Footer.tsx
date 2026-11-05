const Footer = () => {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div
          className="flex flex-col items-center gap-3 text-center text-sm sm:text-base
                        md:flex-row md:items-center md:justify-between md:gap-6 md:text-left"
        >
          <p className="font-semibold text-base-content/70 leading-relaxed">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <span
            aria-hidden="true"
            className="hidden md:block h-5 w-px shrink-0 bg-base-content/20"
          />

          <p className="text-base-content/70 leading-relaxed max-w-md">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
