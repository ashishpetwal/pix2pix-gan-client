'use client'

import React from "react";

interface File {
  name: string;
}

export default function Home() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [response, setResponse] = React.useState('');

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    const lat = file.name.split('_')[2];
    const long = file.name.split('_')[3].replace('.png', '');

    const inputImg = `https://3.aerial.maps.api.here.com/maptile/2.1/maptile/newest/terrain.day/17/${lat}/${long}/256/png8?app_id=pcXBZARHILwXlCihx8d6&token=dzJKV7oQT-zs-vRT_KqiLA&lg=ENG`;

    setInput(inputImg);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ name: file.name }),
      });
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <>

      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
            Pix2Pix GAN
          </div>
          <div>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {!isLoading && !response && <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFile} />
        </label>
      </div>}

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="ml-2 text-gray-500">Generating image...</p>
        </div>
      )}

      {response && (
        <div className="mt-10 flex items-center justify-around">
          <div>
            <img src={input} alt="Input" className="max-w-full h-96 rounded-lg shadow-md" />
            <p className="ml-4 text-gray-500 mt-10 text-xl font-medium">Input image...</p>
          </div>
          <div>
            <img src={response} alt="Generated" className="max-w-full h-96 rounded-lg shadow-md" />
            <p className="ml-4 text-gray-500 mt-10 text-xl font-medium">Generated image...</p>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 p-4 mt-8 w-full absolute bottom-0">
        <div className="container mx-auto text-center text-gray-300">
          <p>&copy; 2024 Pix2Pix GAN. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}