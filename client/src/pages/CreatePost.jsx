import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import PageDescription from '../components/PageDescription'
import FormField from '../components/FormField';
import { Loader } from '../components'
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    generatedImg: ""
  })
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name , value } = e.target
    setForm({ ...form, [name]: value });
  }

  const handleGenerateRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
  };

  const handleSubmit = async (e) => {
  };


  return (
    <section className="max-w-7xl mx-auto">
      <PageDescription
        heading={"Create"}
        description={"Create a new modern Pixel and showcase in the community"}
      />
      <form className='mt-16 max-w-3xl' action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Enter Your name"
            type="text"
            name="name"
            placeholder="Andrew Tate"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Enter Prompt"
            type="text"
            name="prompt"
            placeholder="A journey across the rings of a gas giant, revealing breathtaking landscapes."
            value={form.prompt}
            handleChange={handleChange}
            generateRandomPrompt
            handleGenerateRandomPrompt={handleGenerateRandomPrompt}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.generatedImg ? (
              <img
                src={form.generatedImg}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {isGeneratingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(174,161,161,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>

        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-[#7638c1] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isGeneratingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#CC0909] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost