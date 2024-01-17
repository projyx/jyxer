function request(resource, options) {
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
        ).then(function(body) {
            try {
                var json = JSON.parse(body);
                var options = {
                    status: 200,
                    statusText: "OK"
                };
                console.log(123, json, options);
            } catch (err) {
                var json = body;
                var options = {
                    status: 200,
                    statusText: "OK"
                };
                //console.log(321, json, options);
                //resolve(body);
            }
            const response = new Response(new String(body),options);
            return response
        }).then(function(response) {
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
        }).then(function(body) {
            try {
                var json = JSON.parse(body);
                var options = {
                    status: 200
                };
                console.log(123, json, options);
            } catch (err) {
                var json = body;
                var options = {
                    status: 200
                };
                //resolve(body);
            }
            const response = new Response(json,options);
            resolve(0 < 1 ? json : response);
        }).catch(error=>{
            console.log("function_get 404 ERROR", error);
            reject(error);
        }
        )
    }
    );
}
