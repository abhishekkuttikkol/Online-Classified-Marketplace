import React,{ useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Heart from '../../assets/Heart';
import { categoryContext } from '../../Store/CategoryContext';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import './Post.css';

function Posts({}) {
  const {category_tab} = useContext(categoryContext)
  const {Firebase} = useContext(FirebaseContext)
  const {setPostDetails} = useContext(PostContext)
  const [products, setProducts] = useState([])
  const history = useHistory()
  useEffect(() => {
    Firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPosts = snapshot.docs.map((product)=>{
        return{...product.data(),
        id : product.id}
      })
      setProducts(allPosts)
    })
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{
            return category_tab ? product.category === category_tab && <div onClick={()=>{
              setPostDetails(product)
              history.push('/view post')
            }}
            className="card"
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url}alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          : 
          <div onClick={()=>{
            setPostDetails(product)
            history.push('/view post')
          }}
          className="card"
          >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url}alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name">{product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
          </div>
          }) 
        }
        </div>
        </div>
        <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map(product=>{
            
            return <div onClick={()=>{
              setPostDetails(product)
              history.push('/view post')
            }}
            className="card"
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url}alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default Posts;
