import connection from ".";
import Cart from "./cart";
import Products from "./products";
import ProductsCart from "./productscart";
import ProductsImages from "./productsimages";
import User from "./user";

User.hasOne(Cart)
Cart.belongsTo(User)

Products.hasMany(ProductsImages)
ProductsImages.belongsTo(Products)

Cart.belongsToMany(Products, { through: ProductsCart })
Products.belongsToMany(Cart, { through: ProductsCart })

connection.sync({ alter: true })

export {
  User,
  Cart,
  Products,
  ProductsImages,
  ProductsCart
}