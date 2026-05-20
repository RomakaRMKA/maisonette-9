import softDrinks from '../data/soft_drinks.json'
import mocktails from '../data/mocktails.json'
import cocktails from '../data/cocktails.json'
import wines from '../data/wines.json'
import './MenuPage.css'
import MenuItemCard from './MenuItemCard'

function MenuPage() {
  return (
    <section className="content-panel" id="menu">
      <div className="menu-section">
        <h1 style={{ textAlign: "center", margin: "3rem" }}>Soft Drinks</h1>
        {softDrinks.map((item) => (
        <MenuItemCard
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
      </div>
      <div className="menu-section">
        <h1 style={{ textAlign: "center", margin: "3rem" }}>Mocktails</h1>
        {mocktails.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
      <div className="menu-section">
        <h1 style={{ textAlign: "center", margin: "3rem" }}>Cocktails</h1>
        {cocktails.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
      ))}
      </div>
      <div className="menu-section">
        <h1 style={{ textAlign: "center", margin: "3rem" }}>Wines</h1>
        {wines.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
      
    </section>
  )
}

export default MenuPage
