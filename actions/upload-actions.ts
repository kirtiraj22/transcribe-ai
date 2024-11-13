import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeUploadedFile(
	response: {
		serverData: {
			userId: string;
			file: any;
		};
	}[]
) {
	if (!response) {
		return {
			success: false,
			message: "File upload failed!",
			data: null,
		};
	}

	const {
		serverData: {
			userId,
			file: { url: fileUrl, name: fileName },
		},
	} = response[0];

    if(!fileUrl || !fileName){
        return{
            success: false,
            message: "File upload failed!",
            data: null
        }
    }

    const res = await fetch(fileUrl);

    try{
        const transcriptions = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: res
        })

        console.log("Transcriptions: ", {transcriptions});

        return{
            success: true,
            message: "File uploaded successfully!",
            data: {
                transcriptions, 
                userId
            }
        }
    }catch(error){
        console.error("Error processing the file", error);

        if(error instanceof OpenAI.APIError && error.status === 413){
            return{
                success: false,
                message: "File size exceeds the max limit of 20MB",
                data: null
            }
        }

        return{
            success: false,
            message: error instanceof Error ? error.message : "Error processing file",
            data: null
        }
    }
}
