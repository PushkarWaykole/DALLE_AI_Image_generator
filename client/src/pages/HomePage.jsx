import {React,useState,useEffect} from 'react'

import {Card,Loader,FormField} from '../components'

const RenderCards=({data,title})=>
{
  if(data?.length>0) return data.map((post)=>
  <Card key={post._id} {...post}/>)

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
{title}
    </h2>
  )
}

const HomePage = () => {

  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [allPosts, setAllPosts] = useState([])
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)


  useEffect(() => {
    const fetchPost=async()=>{
      setLoading(true);
      try{
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if(response.ok){
          const result=await response.json();
          // console.log("recienves",result);
          setAllPosts(result.data.reverse())
        }

      }
      catch(err){
        alert(err);
      }
      finally{
        setLoading(false);
      }
    }
    fetchPost();
  }, [])
  

  // console.log(allPosts);
  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
  
    setSearchTimeout(
      setTimeout(() => {

        const searchResults=allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
  
        setSearchedResults(searchResults)
      }, 500)
    )
    

  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px] '>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images created at DALL-E AI</p>
      </div>

      <div className='mt-16'>
      <FormField 
      labelName="Search Posts"
      type="text"
      name="text"
      placeholder="Search posts"
      value={searchText}
      handleChange={handleSearchChange}/>
      </div>

      <div className='mt-10'>
    {loading ? (
      <div className='flex justify-center items-center'>
        <Loader />
      </div>
    ):(
      <>
        {searchText && (
          <h2 className='font-medium text-[#666e75] text-xl mb-3'>
            Showing results for <span className='text-[#222328]'>{searchText}</span>
          </h2>
        )}

        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
          {searchText ? (
            <RenderCards 
            data={searchedResults}
            title="No search results found"/>
          ):
          (
            <RenderCards 
            data={allPosts}
            title="No posts found"/>
          )}
        </div>
      </>
    )}
      </div>


      
<footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/PushkarWaykole" class="hover:underline" target="_blank">Pushkar Waykole</a>
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="https://github.com/PushkarWaykole/Dalle_AI_Image_Generator" class="mr-4 hover:underline md:mr-6 ">Github</a>
        </li>
    </ul>
</footer>

    </section>
    
  )
}

export default HomePage