import { Cloudinary } from "@cloudinary/url-gen/index";

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
    }
})