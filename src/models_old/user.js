import { Model, DataTypes } from 'sequelize'
import sequelize from './index.js'

const User = sequelize.define("users", {

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }

})


export default User;