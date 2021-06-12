import { createContext, useState } from 'react'

export const categoryContext = createContext(null)

export default function CatgoryContext({children}) {
    const [category_tab, setCategory_tab] = useState(null)

    return(
        <categoryContext.Provider value={{category_tab, setCategory_tab}}>
            {children}
        </categoryContext.Provider>
    )
}