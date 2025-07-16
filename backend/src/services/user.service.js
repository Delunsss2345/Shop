const ApiError = require('@/utils/error/ApiError');
const bcrypt = require('bcrypt') ; 
const db = require('@/db/models/index')
const Cloudinary = require('@/services/cloudinary.service')
const { where } = require('sequelize');
class UserService {
     findAllUsers = async () => {
          const users = await db.User.findAll({
               include : {
                    model : db.Role , 
                    as : "role" 
               },
               order: [['is_active', 'DESC']]
          }) ; 
          return users ; 
     }
     findUserById = async (id) => {
          const user = await db.User.findByPk(id) ; 
          if(!user) throw new ApiError(404 , "Không tìm thấy user") ; 

          return user ; 
     }
     createUser = async (data) => {
          const exists = await db.User.findOne({
               where : {email : data.email} 
          }) ;
          if(exists) throw new ApiError(409 , "Email đã được sử dụng") ; 

          const hashPassword = await bcrypt.hash('123456', 10) ; 

          const user = await db.User.create({
               ...data ,  password : hashPassword 
          })

          const newUser = await db.User.findByPk(user.id , {
               include : {
                    model : db.Role , 
                    as : "role" 
               }
          });

          return newUser ; 
     } 
     updateUser = async (id , userData) => {
          let imageAvatar ; 
          if(userData.avatar) {
               console.log(userData.avatar) ; 
               imageAvatar = await Cloudinary.uploadCloudinary(userData.avatar , 'shop') ; 
               console.log(imageAvatar) ; 
          }

          const result = await db.User.update(
               {...userData, ...(imageAvatar && { avatar: imageAvatar })},
               {where: { id }}
          );

          
          if(result[0] === 0) {
               throw new ApiError(404 , "Không tìm thấy user để cập nhật") ; 
          }
          
          const updatedUser = await db.User.findByPk(id , {
               include : {
                    model : db.Role , 
                    as : "role" 
               }
          });
          return updatedUser ; 
     } 
     deleteUser = async (id) => {
          const result = await db.User.update(
               { isActive : false },        
               { where: { id } } 
          );
          console.log(result) ; 
          if(result[0] === 0) {
               throw new ApiError(404 , "Không tìm thấy user để vô hiệu") ; 
          }
     }
}

module.exports = new UserService () ; 