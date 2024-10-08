import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts),{
            status:200
        });
    } catch(error) {
        return new Response('Failed to fetch the prompts from the DB',{
            status:500
        });
    }
}