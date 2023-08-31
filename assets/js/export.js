function get(resource, options) {
    return new Promise(async function(resolve, reject) {
        await fetch(resource, options).then(async(response)=>{
            console.log(4, response);
            if (!response.ok) {
                return response.text().then(text=>{
                    var text = JSON.stringify({
                        code: response.status,
                        message: JSON.parse(text)
                    });
                    throw new Error(text);
                }
                )
            }
            return response.text();
        }
        ).then(body=>{
            try {
                const response = new Response(JSON.parse(response), {
                    status: 200
                });
                resolve(response);
            } catch (err) {
                resolve(response);
            }
        }
        ).catch(error=>{
            console.log("function_get 404 ERROR", error);
            reject(error);
        }
        )
    }
    );
}
