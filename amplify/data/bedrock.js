export function request(ctx) {
    const { ingredients = [] } = ctx.args;

    // Construct prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

    // Return request configuration
    return {
        resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                            },  
                        ],
                    },
                ]
            }),
        },
    };
}

export function response(ctx) {
    // Parse response body
    const parsedBody = JSON.parse(ctx.result.body);
    // Extract content from response
    const res = {
        body: parsedBody.content[0].text,
    };

    // Return response
    return res;
}