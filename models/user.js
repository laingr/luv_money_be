"use strict";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.Pool); //,{foreignKey: 'userUuid', as:'Pools'};
    // User.hasMany(models.Invites) //{foreignKey: 'userUuid', as:'Invites'}
  };

  return User;
};
