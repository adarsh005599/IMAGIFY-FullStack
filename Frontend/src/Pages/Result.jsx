import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await generateImage(input);

    if (result) {
      setImage(result);
      setIsImageLoaded(true);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-xl mx-auto mt-10 flex flex-col items-center"
    >
      {/* Image Display */}
      <div className="relative w-full flex justify-center">
        <img
          src={image}
          alt="Generated"
          className="rounded-xl max-w-sm w-full object-cover border-2 border-b-blue-600"
        />

        {/* Premium Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Prompt Input */}
      {!isImageLoaded && !loading && (
        <div className="flex w-full max-w-xl bg-neutral-500 rounded-full overflow-hidden mt-6 px-2 py-1">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 px-4 py-2 text-white bg-transparent outline-none placeholder:text-white/90 text-sm"
          />
          <button
            type="submit"
            className="bg-zinc-900 text-white/80 px-6 py-2 text-sm rounded-full hover:bg-zinc-800 transform transition-all duration-300 hover:scale-95 active:scale-90"
          >
            Generate
          </button>
        </div>
      )}

      {/* Actions */}
      {isImageLoaded && !loading && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
              setInput('');
            }}
            className="bg-transparent border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer border-2 border-b-blue-500 hover:bg-blue-500 transform transition-all duration-300 hover:scale-95 active:scale-90"
          >
            Generate Another
          </p>
          <a
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transform transition-all duration-300 hover:scale-95 active:scale-90"
            href={image}
            download="generated-image.png"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
