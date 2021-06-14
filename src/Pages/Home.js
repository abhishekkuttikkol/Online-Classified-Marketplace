import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import './Home.css';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { SearchCategory } from '../Store/SearchContext';

function Home(props) {
  const {SetSearchTerm} = useContext(SearchCategory)
  useEffect(() => {
    SetSearchTerm()
  }, [])
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner banner_img/>
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 