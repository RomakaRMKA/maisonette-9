import './MenuPage.css'

interface MenuItemCardProps {
  name: string;
  description: string;
  price: number;
}

function MenuItemCard({ name, description, price }: MenuItemCardProps) {
  return (
    <div className="menu-item-card">
      <div className="menu-item-header">
        <p className="menu-item-name">{name}</p>
        <span className="menu-item-price">{price} Gils</span>
      </div>
      <p className="menu-item-description">{description}</p>
    </div>
  )
}

export default MenuItemCard
