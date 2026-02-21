import { liveEvents } from "../constants";

const LiveEvents = () => {
  return (
    <div className="w-full py-8 dark:bg-black">
      <div className="mx-auto dark:text-white px-4 sm:px-8 lg:px-16">
        <h1 className="text-2xl lg:text-4xl text-center my-4">
          The Best of Live Events
        </h1>

        {/* Needle Line */}
        <span className="mx-auto block h-0.5 w-[70%] bg-linear-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500" />

        {/* EVENTS SCROLL */}
        <div className="mt-6 flex gap-4 overflow-x-auto scrollbar-hide">
          {liveEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-54 rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={event.image}
                alt={`Event ${event.id}`}
                className="w-full h-54 object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveEvents;
