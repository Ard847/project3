const { User } = require('../config/orm');
const { Household } = require('../config/orm');

const findOne = async (ID) => {
    return await User.findOne({where: { id :ID}});
}

const updateImageUser = async (publicId,ID) => {
    return await User.update({image : publicId},{where:{ id : ID}});
}

const updateImageHouse = async (publicId,ID) => {
    return await Household.update({image : publicId},{where:{ id : ID}});
}

module.exports = {
    findOne,
    updateImageUser,
    updateImageHouse
}