import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";

import "./style.scss";


const HeroBanner = () =>{
    const[background, setBackground]=useState("");
    const[query, setQuery]=useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);

    const{data, loading}=useFetch("/movie/upcoming");

    useEffect(() => {
        const background = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(background);
    }, [data])

    const searchQueryHandler = (e) =>{
        if(e.key==="Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">
                {/* when loading state will false then this div block will render */}
            {!loading && <div className="backdrop-img"> 
                <Img src={background} />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome </span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now. 
                    </span>
                    <div className="searchInput">
                        <input type="text" placeholder="Search for a Movies or TV shows..."
                         onKeyUp={searchQueryHandler} 
                         onChange={(e)=> setQuery(e.target.value)} />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default HeroBanner;