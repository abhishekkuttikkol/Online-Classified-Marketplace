import React,{ useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Heart from '../../assets/Heart';
import { categoryContext } from '../../Store/CategoryContext';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { SearchCategory } from '../../Store/SearchContext';
import './Post.css';

function Posts({search}) {
  const {category_tab} = useContext(categoryContext)
  const {Firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const {searchTerm} = useContext(SearchCategory)
  const {setPostDetails, postDetails} = useContext(PostContext)
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(10)
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
  const loadMore = ()=>{
      setVisible((prevValue) => prevValue + 10)
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.filter((product)=>{
            if (searchTerm === undefined){
              return product
            } else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return product
            } else if (product.category.toLowerCase().includes(searchTerm.toLowerCase())){
                return product
            }
            return null
          }).slice(0, visible).map(product=>{
            return category_tab ? product.category === category_tab && <div 
            className="card"
            onClick={()=>{
              setPostDetails(product)
              history.push('/view post')
            }}
            >
            <div className="favorite">
              < Heart></Heart>
            </div>
            <div >
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
          </div>
          : 
          <div 
          onClick={()=>{
            setPostDetails(product)
            history.push('/view post')
          }}
          className="card"
          >
          <div  className="favorite">
            <Heart></Heart>
          </div>
          <div >
          <div  className="image">
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
          </div>
          }) 
        }
        </div>
        <button onClick={loadMore} className="load-button">load more</button>
        </div>
        <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.slice(0, 10).map(product=>{
            
            return <div 
            onClick={()=>{
              setPostDetails(product)
              history.push('/view post')
            }}
            className="card"
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div >
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
          </div>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default Posts;
