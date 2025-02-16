
const ForumBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        Join us for an intimate Suhoor dinner with fellow business leaders in Riyadh on March 8th, 2024.{" "}
        <a 
          href="/events/suhoor-dinner"
          className="underline font-medium hover:text-white/90"
        >
          Learn More
        </a>
      </span>
    </div>
  );
};

export default ForumBanner;
