import React, { useState, useEffect } from "react";

export default function DocumentsGallery() {
  // Store your documents
  const documents = [
    {
      title: "Certification in Web Development",
      type: "certification",
      image: "/docs/certificate1.jpg",
      pdf: "/docs/certificate1.pdf",
    },
    {
      title: "Offer Letter - Company XYZ",
      type: "offer",
      image: "/docs/offerletter1.jpg",
      pdf: "/docs/offerletter1.pdf",
    },
    {
      title: "Certification in Python",
      type: "certification",
      image: "/docs/certificate2.jpg",
      pdf: "/docs/certificate2.pdf",
    },
    {
      title: "Offer Letter - Company ABC",
      type: "offer",
      image: "/docs/offerletter2.jpg",
      pdf: "/docs/offerletter2.pdf",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [previewIndex, setPreviewIndex] = useState(null); // store index instead of image

  // Filter + Search logic
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || doc.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Keyboard navigation (ESC, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (previewIndex !== null) {
        if (e.key === "Escape") {
          setPreviewIndex(null);
        } else if (e.key === "ArrowRight") {
          setPreviewIndex((prev) => (prev + 1) % filteredDocs.length);
        } else if (e.key === "ArrowLeft") {
          setPreviewIndex((prev) =>
            (prev - 1 + filteredDocs.length) % filteredDocs.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewIndex, filteredDocs]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        📜 My Certifications & Offer Letters
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="certification">Certifications</option>
          <option value="offer">Offer Letters</option>
        </select>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 text-center"
            >
              {/* Clickable Image for Preview */}
              <img
                src={doc.image}
                alt={doc.title}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                onClick={() => setPreviewIndex(index)}
              />

              <h3 className="text-lg font-semibold mt-3">{doc.title}</h3>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-4">
                <a
                  href={doc.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View
                </a>
                <a
                  href={doc.pdf}
                  download
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No documents found.
          </p>
        )}
      </div>

      {/* Modal Preview */}
      {previewIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full p-4 flex flex-col items-center">
            <img
              src={filteredDocs[previewIndex].image}
              alt={filteredDocs[previewIndex].title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
            />
            <p className="text-white mt-3 text-lg">
              {filteredDocs[previewIndex].title}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  setPreviewIndex(
                    (previewIndex - 1 + filteredDocs.length) %
                      filteredDocs.length
                  )
                }
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                ⬅ Prev
              </button>
              <button
                onClick={() =>
                  setPreviewIndex((previewIndex + 1) % filteredDocs.length)
                }
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Next ➡
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
