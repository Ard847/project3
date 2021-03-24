const {User} = require('../config/orm');

const findOne = async (ID) => {
    return await User.findOne({where: { id :ID}});
}

const updateImage = async (publicId,ID) => {
    return await User.update({image : publicId},{where:{ id : ID}});
}

module.exports = {
    findOne,
    updateImage
}