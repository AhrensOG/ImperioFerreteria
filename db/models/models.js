import connection from ".";
import Order from "./order";
import Products from "./products";
import ProductsOrder from "./productsorder";
import ProductsImages from "./productsimages";
import User from "./user";
import Categories from "./categories";
import ProductsCategories from "./productscategories";

User.hasMany(Order)
Order.belongsTo(User)

Products.hasMany(ProductsImages)
ProductsImages.belongsTo(Products)

Order.belongsToMany(Products, { through: ProductsOrder })
Products.belongsToMany(Order, { through: ProductsOrder })

Products.belongsToMany(Categories, { through: ProductsCategories })
Categories.belongsToMany(Products, { through: ProductsCategories })

connection.sync({ alter: true })

export {
  User,
  Order,
  Products,
  ProductsImages,
  ProductsOrder,
  Categories,
  ProductsCategories
}