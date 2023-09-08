import { useState, useEffect } from 'react';

const Tooltip = ({ message }: { message: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const handleTouchStart = () => {
    setShowTooltip(true);

    const newTimerId = setTimeout(() => {
      setShowTooltip(false);
    }, 2000); // Hide after 2 seconds

    if (timerId) clearTimeout(timerId);

    setTimerId(newTimerId);
  };

  return (
    <div className="relative inline-block">
      <img
        id="tooltip-icon"
        className="w-7 h-7 overflow-hidden cursor-pointer"
        alt=""
        src="/tooltip.svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={handleTouchStart}
      />
      <div style={{ backdropFilter: 'blur(25px)' }} className={`absolute top-1/2 transform -translate-y-1/2 left-full ml-2 p-2 rounded bg-gray-200 box-border w-[250px] h-[75px] border-[1px] border-solid border-black ${showTooltip ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
        <div className="text-black inline-block">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;

