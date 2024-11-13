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


async function generateBlogPost({
    transcriptions,
    userPosts
}: {
    transcriptions: string;
    userPosts: string;
}){
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a skilled content writer that converts audio transcriptions into well-structured, engaging blog posts in Markdown format. Create a comprehensive blog post with a catchy title, introduction, main body with multiple sections, and a conclusion. Analyze the user's writing style from their previous posts and emulate their tone and style in the new post. Keep the tone casual and professional.",
            },
            {
                role: "user",
                content: `Here are some of my previous blog posts for reference: 
                ${userPosts}
                Please convert the following transcription into a well-structured blog using Markdown formatting. Follow this structure : 
                1. Start with a SEO friendly catchy title on the first line.
                2. Add two newlines after the title.
                3. Write an engaging introduction paragraph.
                4. Create multiple sections for the main content, using appropriate headings (##, ###).
                5. Include relevant subheading within sections if needed.
                6. Use bullet points or numbered lists where appropriate.
                7. Add a conclusion paragraph at the end.
                8. Ensure the content is informative, well-organized, and easy to read.
                9. Emulate my writing style, tone, and any recurring patterns you notice from my previous posts.

                Here's the transcription to convert: ${transcriptions} 
                `,
            },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
    })

    return completion.choices[0].message.content;
}