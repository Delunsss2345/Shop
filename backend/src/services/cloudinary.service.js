const {cloudinary} = require('@/config/cloudinary');

class Cloudinary {
    async uploadCloudinary(file, folder) {
        const result = await cloudinary.uploader.upload(file, { folder });
        return result?.secure_url;
    }   
    async destroyCloudinary(fileUrl) {
        const parts = fileUrl.split('/');
        const fileName = parts.pop(); // abcxyz.jpg
        const folder = parts.pop();   // user-avatars

        const publicId = `${folder}/${fileName.split('.')[0]}`; // user-avatars/abcxyz

        await cloudinary.uploader.destroy(publicId);
    }

}

module.exports = new Cloudinary();