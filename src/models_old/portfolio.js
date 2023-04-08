import { Model, DataTypes } from 'sequelize'
import sequelize from './index.js'

const Portfolio = sequelize.define("portfolio", {

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assets: {
    type: DataTypes.INTEGER
  },
  equity: {
    type: DataTypes.INTEGER
  },
  fixed_income: {
    type: DataTypes.INTEGER
  },
  alternatives: {
    type: DataTypes.INTEGER
  }


})