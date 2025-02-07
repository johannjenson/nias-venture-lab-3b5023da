
const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        On February 13th, 2025, join us for an exclusive gathering of global business leaders and investors in Riyadh.{" "}
        <a 
          href="/events/nias-business-forum"
          className="underline font-medium hover:text-white/90"
        >
          Learn More
        </a>
      </span>
    </div>
  );
};

export default EventBanner;
