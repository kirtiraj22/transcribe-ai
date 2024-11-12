import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter} from "uploadthing/next"
import { UploadThingError} from "uploadthing/server"

const f = createUploadthing();

export const ourFileRouter = {
    videoOrAudioUploader: f({ video: {
        maxFileSize: "32MB"
    }}).middleware(async ({ req }) => {
        console.log("Video/audio slug started")
        const user = await currentUser();
        console.log( { user })

        if(!user) {
            throw new UploadThingError("Unauthorized");
        }

        return {
            userId: user.id
        }
    }).onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId: ", metadata.userId)
        console.log("file url: ", file.url)

        return {
            userId: metadata.userId,
            file
        }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;