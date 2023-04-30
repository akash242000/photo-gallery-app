import React, { useEffect, useState } from 'react'
import {getPhotos,searchPhotos} from '../api'
import Loading from './Loading';
import Photo from './Photo';

export default function Home() {

    const [imageList, setImageList] =useState([]);
    const [nextCursor, setnextCursor]=useState(null);
    const [isLoading, setLoading]=useState(false);
    const [searchValue, setSearchValue]= useState("");
    const [popup, setPopup]= useState({isPopup:false, imageUrl:null})

    useEffect(()=>{
        const fetchData =async() =>{
            setLoading(true)
            const data= await getPhotos();
            setImageList(data.resources);
            setnextCursor(data.next_cursor);
            setLoading(false);
        }
        fetchData();
        console.log(imageList);
    },[])

    async function loadmore(){
        setLoading(true);
        const data= await getPhotos(nextCursor);
        setImageList((prevState)=>[...prevState,...data.resources]);
        setnextCursor(data.next_cursor);
        setLoading(false);
    }

    function handleChange(e){
        setSearchValue(e.target.value);
    }

    async function searchPhoto(){
        const data=await searchPhotos(searchValue,nextCursor);
        setImageList(data.resources);
        setnextCursor(data.next_cursor);
    }

    async function clearSearch(){
        setSearchValue("");
        setLoading(true)
        const data= await getPhotos();
        setImageList(data.resources);
        setnextCursor(data.next_cursor);
        setLoading(false);
    }

    function imagePopup(url){
        setPopup({isPopup:true, imageUrl:url});

    }

    function goBack(){
        setPopup({isPopup:false, imageUrl:null});
    }

    function switchphoto(direction){

        let imageIndex= imageList.findIndex((element)=>{
            return element.url===popup.imageUrl
        });

        let switchUrl=popup.imageUrl;
        if(direction==='left'){
            switchUrl=imageList[imageIndex-1].url;
        }
        if(direction==='right'){
            switchUrl=imageList[imageIndex+1].url;
        }

        setPopup({isPopup:true, imageUrl:switchUrl})

    }

  return (
    <div>

        {!popup.isPopup?
            <nav>
                <div className="search-sec">
                    <input type="text" className='search-box' name="search" id="search" value={searchValue} onChange={handleChange}/>
                    <button className='btn btn-sm' onClick={clearSearch}>✕</button>
                    <button className='btn' onClick={searchPhoto}>Search</button>
                </div>

                <div className="upload">
                    <button className='btn'>Upload</button>
                </div>
            </nav>
            :
            <></>
        }

           {popup.isPopup?
            <Photo url={popup.imageUrl} goBack={goBack} switchphoto={(direction)=>{switchphoto(direction)}} />
            :<></>
            }
        
            <div className="images-box">
                {imageList.map((element)=>{
                    return ( 
                    <img src={element.url} key={element.public_id} alt={element.public_id} onClick={()=>{imagePopup(element.url)}} />
                    )
                })}
            </div>
        {isLoading? <Loading/> :
            <div className="loadmore-box">    
                    {nextCursor &&<button className='btn btn-center' onClick={loadmore}>Load More</button>}
            </div> 
        }
    </div>
  )
}
