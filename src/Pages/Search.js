import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Posts from '../Components/Posts/Posts'
import { categoryContext } from '../Store/CategoryContext'
import { SearchCategory } from '../Store/SearchContext'

function Search() {
    const {searchTerm} = useContext(SearchCategory)
    const {setCategory_tab} = useContext(categoryContext)
    const history = useHistory()
    if(searchTerm === 'car' || searchTerm === 'cars'){ setCategory_tab('Car')}
    if(searchTerm === 'motorcycle' || searchTerm === 'motorcycles' || searchTerm === 'bikes' || searchTerm === 'bike'){ setCategory_tab('Motorcycle')}
    if(searchTerm === 'gadgets' || searchTerm === 'gadget'){ setCategory_tab('Gadgets')}
    if(searchTerm === 'for sale' || searchTerm === 'for sales'){ setCategory_tab('For sale')}
    if(searchTerm === 'scooters' || searchTerm === 'scooter'){ setCategory_tab('Scooters')}
    if(searchTerm === 'commercial' || searchTerm === 'commercials'){ setCategory_tab('Commercial')}
    if(searchTerm === 'for rent' || searchTerm === 'for rents'){ setCategory_tab('For rent')}
    history.listen(()=>{
        if(history.action === 'POP'){
            setCategory_tab('')
        }
    })

    return (
        <div>
            <Header/>
            <Banner/>
            <Posts/>
            <Footer />
        </div>
    )

}

export default Search
