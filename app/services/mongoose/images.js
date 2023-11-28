const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../erros');

// cara ke 1 untuk generater image 
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/avatar/default_avatar.png',
  });

  return result;
};

// cara ke 2 untuk generater image tetapi hanya url dan disimpan ketika sudah disubmit
// const generateUrlImage = async (req) => {
//     const result = `uploads/${req.file.filename}`
  
//     return result;
//   };

// tambahkan function checking Image 
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};
// jangan lupa export checkingImage
module.exports = { createImages, checkingImage };