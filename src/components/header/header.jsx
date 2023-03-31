import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";   // This is icons Library
import { SlMenu } from "react-icons/sl";            // This is icons Library
import { VscChromeClose } from "react-icons/vsc";   // This is icons Library
import { useNavigate, useLocation } from "react-router-dom"; // For Navigating other pages

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");   // for scrolling effect in menue.
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu)
            {
                setShow("hide");
            }
            else{
                setShow("show");
            }
        }
        else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () =>{
            window.removeEventListener('scroll', controlNavbar);
        };
    },[lastScrollY]);

    const searchQueryHandler = (e) =>{
        if(e.key==="Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
        setTimeout(() =>{              {/*when we open srch baar aftr few sec it will automatically hide */}
            setShowSearch(false);
        },10500);
    }


    const openSearch = () =>{
        setMobileMenu(false)
        setShowSearch(true)
    }
    const openMobileMenue = () =>{
        setMobileMenu(true)
        setShowSearch(false)
    }

    const navigationHandler = (type) => {
        if(type === "movie") {
            navigate("/explore/movie");
        }
        else{
            navigate("/explore/tv");
        }
        setMobileMenu(false); 
    }

    return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>  {/*For conditionally class, use {} braces*/}
            <ContentWrapper>
                <div className="logo" id="logoName" onClick={() => navigate("/")}>
                   <h3>Moviesflix</h3>
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch}/>
                    </li>
                </ul>

                {/* For Mobile Interface */}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? ( <VscChromeClose onClick={() => setMobileMenu(false)}/>) : (<SlMenu onClick={openMobileMenue}/>)}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                    <div className="searchInput">
                                <input type="text" placeholder="Search for a Movies or TV shows..."
                                onKeyUp={searchQueryHandler} 
                                onChange={(e)=> setQuery(e.target.value)} />
                                <VscChromeClose onClick={() => setShowSearch(false)}/>
                    </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;