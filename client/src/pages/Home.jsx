import React from 'react'
import { useState, useEffect } from 'react'
import { Card, FormField, Loader } from '../components';
import { Form } from 'react-router-dom';
import PageDescription from '../components/PageDescription'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className="mt-5 font-bold text-[#CC0909] text-xl uppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://locahost:8000/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='max-w-7xl mx-auto'>
      <PageDescription
        heading={"Pixels SHOWcase"}
        description={"Scroll through to experience the finest creations by DALL-E"}
      />

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {
          loading
            ? <div className="flex justify-center items-center"><Loader /></div>
            : (
              <>
                {
                  searchText && <h2 className='font-md text-[#666e75] text-xl mb-3'>Showing results for <span className='text-[#222328] '>{searchText}</span></h2>
                }
                <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                  {
                    searchText
                      ? (
                        <RenderCards data={searchedResults} title="No search results" />
                      )
                      : (
                        <RenderCards data={posts} title="No posts found" />
                      )
                  }
                </div>
              </>
            )
        }
      </div>
    </section>
  )
}

export default Home