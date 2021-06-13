import React,{ useContext } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { categoryContext } from '../../Store/CategoryContext';
function Banner({banner_img}) {
  const {setCategory_tab} = useContext(categoryContext)
  return (
    <div className="bannerParentDiv">
      <div className='navbar'>
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
            }}>Gadgets</span>
            <span onClick={()=>{
                setCategory_tab('For sale')
            }}>For Sale:Houses & Apart...</span>
            <span onClick={()=>{
                setCategory_tab('Scooters')
            }}>Scoot...</span>
            <span onClick={()=>{
                setCategory_tab('Commercial')
            }}>Commercial & Other Ve...</span>
            <span onClick={()=>{
                setCategory_tab('For rent')
            }}>For Rent: House & Apart...</span>
          </div>
        </div>
        { banner_img &&
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
        }
      </div>
      
    </div>
    </div>
  );
}

export default Banner;
