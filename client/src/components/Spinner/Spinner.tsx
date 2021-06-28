import React from "react";

const Spinner = () => {
  return (
    <div className="container flex justify-center mt-8">
      <svg className="animate-spin bg-purple-400 h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
    </div>
  );
};

export default Spinner;
