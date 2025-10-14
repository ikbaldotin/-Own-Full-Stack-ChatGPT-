import React, { useEffect, useState } from "react";
import { dummyPublishedImages } from "../../public/assets";
import Loading from "./Loading";

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    // Simulating async fetch
    setTimeout(() => {
      setImages(dummyPublishedImages);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100">
        Community Images
      </h2>

      {images.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {images.map((item, index) => (
            <a
              key={index}
              href={item.imageUrl}
              target="_blank"
              className="relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={`Created by ${item.userName}`}
                className="w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <p className="text-sm text-gray-700 dark:text-purple-200 p-2 bg-white/70 dark:bg-purple-900/60 backdrop-blur-md">
                Created by {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-purple-300">No images found.</p>
      )}
    </div>
  );
};

export default Community;
