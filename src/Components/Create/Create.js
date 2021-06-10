import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../Store/Context'
import SyncLoader from 'react-spinners/SyncLoader'

const Create = () => {
  const [loading, setLoading]  = useState(false)
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const {Firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const date = new Date()
  const history = useHistory()

  const handleSubmit = ()=>{
    setLoading(true)
    Firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{

        Firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        setLoading(false)
        history.push('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
      { loading ?  
      <div style={style}>
        < SyncLoader color={"#a2a4a6"} size={'30px'} margin={'10px'}/>
      </div>
        :
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=> setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={image && URL.createObjectURL(image) }></img>}
         
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>}
      </card>
    </Fragment>
  );
};

export default Create;
