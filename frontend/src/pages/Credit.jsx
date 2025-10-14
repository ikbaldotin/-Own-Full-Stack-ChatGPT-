import React, { useEffect, useState } from "react";
import { dummyPlans } from "../../public/assets";
import Loading from "./Loading";
const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPlans = async () => {
    setPlans(dummyPlans);
    setLoading(false);
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  if (loading) return <Loading />;

  return (
    // Main Content Container: Full height, horizontally centered, scrollable
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Heading */}
      <h2 className="text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white">
        Credit Plans
      </h2>

      {/* Plans Grid Container: Centered, flexible wrapping layout */}
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          // Individual Plan Card
          <div
            key={plan.plan_id}
            // Dynamic Class Styling: Highlights 'pro' plan with purple background
            className={`
              border border-gray-200 dark:border-purple-700 rounded-lg 
              shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] 
              flex flex-col 
              ${
                plan.plan_id === "pro"
                  ? "bg-purple-50 dark:bg-purple-900"
                  : "bg-white dark:bg-transparent"
              }
            `}
          >
            {/* Plan Name */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
            </div>

            {/* Price and Credits Display */}
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
              ${plan.price}
              <span className="ml-1 text-sm font-normal text-gray-600 dark:text-gray-300">
                / {plan.credits} credits
              </span>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-purple-300 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  - {feature}
                </li>
              ))}
            </ul>

            <button className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition-colors">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
