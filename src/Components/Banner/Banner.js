import React,{ useContext } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { categoryContext } from '../../Store/CategoryContext';
function Banner() {
  const {setCategory_tab} = useContext(categoryContext)
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span style={{cursor : 'pointer'}} onClick={()=>{
                setCategory_tab('')
            }}>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>{
                setCategory_tab('Car')
            }}>Cars</span>
            <span onClick={()=>{
                setCategory_tab('Motorcycle')
            }}>Motorcy...</span>
            <span onClick={()=>{
                setCategory_tab('Gadgets')
            }}>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
