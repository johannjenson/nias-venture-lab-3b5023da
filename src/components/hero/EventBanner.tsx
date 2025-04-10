
const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        On March 20th, join us for Fireside Chats and a cozy Iftar meal at Fahad's farmhouse in Al Amaariah.{" "}
        <a 
          href="/events/fireside-chats"
          className="underline font-medium hover:text-white/90"
        >
          Learn More
        </a>
      </span>
    </div>
  );
};

export default EventBanner;
