import Layout from "@/components/layout/layout";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CreateSong = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [uuid, setUuid] = useState("");
  const [irsc, setIrsc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send file and data
    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("irsc", irsc);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);

    try {
      // Send data to the API endpoint
      const response = await fetch("/upload-song-spaces", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        console.log("Song uploaded successfully!");
        // Reset form state
        setUuid("");
        setIrsc("");
        setTitle("");
        setDescription("");
        setArtist("");
        setFile(null);
      } else {
        console.error("Failed to upload song.");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-white font-bold text-3xl mb-12">
        Create New Song ⚡
      </h1>
      <div className="flex">
        <div className="ml-6 w-[45%]">
          <h2 className="text-xl font-semibold mb-2">Name</h2>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded ${
              isFocused ? "border-purple-500" : "border-gray-300"
            } bg-gray-200 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6`}
            placeholder="Song Name"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <textarea
            type="textarea"
            className={`w-full px-4 py-2 border rounded ${
              isFocused ? "border-purple-500" : "border-gray-300"
            } bg-gray-200 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6`}
            placeholder="Song Name"
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h2 className="text-xl font-semibold mb-2">IRSC Code</h2>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded ${
              isFocused ? "border-purple-500" : "border-gray-300"
            } bg-gray-200 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6`}
            placeholder="Code here"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={irsc}
            onChange={(e) => setIrsc(e.target.value)}
          />
          <h2 className="text-xl font-semibold mb-2">Artist</h2>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded ${
              isFocused ? "border-purple-500" : "border-gray-300"
            } bg-gray-200 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="Artist Name"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold mb-2">Upload Music</h2>
          <div className="relative w-[500px] h-[300px] border-2 border-gray-300 border-dashed rounded-md p-10">
            <input
              id="file"
              name="file"
              type="file"
              className=" w-full h-full bg-transparent text-transparent"
              onChange={handleFileChange}
              accept="audio/mp3"
            />
            <div className="text-center">
              <p className="absolute top-10 left-20 text-sm text-gray-500 mt-16">
                Drag and drop a file here or click to browse
              </p>
              {file && <p className="text-blue-500">{file.name}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="p-4 bg-purple-800 h-[50px] text-white font-semibold flex items-center justify-center rounded-lg mt-16 hover:text-black hover:bg-white transition ease-in-out delay-100 duration-200 hover:scale-105">
              <FontAwesomeIcon
                icon={faMusic}
                width={20}
                height={20}
                className="mr-2"
              />
              Create song
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateSong;