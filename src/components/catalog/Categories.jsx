import "../../styles/categories.css";

function Categories({

    categories,

    selectedCategory,

    setSelectedCategory

}){

    return(

        <div className="categories">

            {categories.map(category=>(

                <button

                    key={category}

                    onClick={()=>setSelectedCategory(category)}

                    className={

                        selectedCategory===category

                        ? "category-btn category-active"

                        : "category-btn"

                    }

                >

                    {category
    .toLowerCase()
    .replace(/\b\w/g, letra => letra.toUpperCase())
}

                </button>

            ))}

        </div>

    )

}

export default Categories;