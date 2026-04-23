import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();

        const profilepic = formData.get("profilepic");
        const bannerpic = formData.get("bannerpic");
        const document = formData.get("document");

        const oldProfilePublicId = formData.get("oldProfilePublicId");
        const oldBannerPublicId = formData.get("oldBannerPublicId");
        const oldDocumentPublicId = formData.get("oldDocumentPublicId");

        //before uploading a new file, delete the old one if it exists.
        if (profilepic && oldProfilePublicId) {
        await cloudinary.uploader.destroy(oldProfilePublicId);
        }

        if (bannerpic && oldBannerPublicId) {
        await cloudinary.uploader.destroy(oldBannerPublicId);
        }

        if (document && oldDocumentPublicId) {
        await cloudinary.uploader.destroy(oldDocumentPublicId, {
            resource_type: "raw",   // resource_type: "raw" bcause PDFs/docs are uploaded as raw files, not images
        });
        }

        const uploadFile = async (file, folder, resourceType = "image") => {
            if (!file) return null;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise((resolve, reject) => {
                cloudinary.uploader
                .upload_stream(
                    {
                    folder,
                    resource_type: resourceType,
                    },
                    (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                    },
                )
                .end(buffer);
            });
        };

        const uploadedProfile = await uploadFile(profilepic, "profilepics", "image");

        const uploadedBanner = await uploadFile(bannerpic, "bannerpics", "image");

        const uploadedDocument = await uploadFile(document, "documents", "raw");    // resource_type: "raw" bcause PDFs/docs are uploaded as raw files, not images

        return NextResponse.json({
        profilepic: uploadedProfile
            ? {
                url: uploadedProfile.secure_url,
                public_id: uploadedProfile.public_id,
            }
            : null,

        bannerpic: uploadedBanner
            ? {
                url: uploadedBanner.secure_url,
                public_id: uploadedBanner.public_id,
            }
            : null,

        document: uploadedDocument
            ? {
                url: uploadedDocument.secure_url,
                public_id: uploadedDocument.public_id,
            }
            : null,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
