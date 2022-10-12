export const helpHttp=()=>{
    const customFetch=(endpoin,option)=>{
        const defaultHeader={
            accept:"application/json",
        }
        const controller= new AbortController();
        option.signal = controller.signal;

        option.method=option.method || "GET";
        option.headers=option.headers ?{...defaultHeader,...option.headers} : defaultHeader;

        option.body=JSON.stringify(option.body)  || false;

        if(!option.body){
            delete option.body;
        }
        setTimeout(()=>controller.abort(),40000);

        return fetch(endpoin,option)
                .then((res)=>res.ok ? res.json(): Promise.reject({
                    err:true,
                    status:res.status  || "00",
                    statusText:res.statusText  || "Ocurrio un error"
                }))
                .catch((err)=>err)
    }

    const Get =(url, option={})=>{
        return customFetch(url,option)
    }
    const Post =(url,option={})=>{
        option.method="POST";
        return customFetch(url,option);
    };
    const Put=(url,option={})=>{
        option.method="PUT";
        return customFetch(url,option);
    }
    const Del=(url,option={})=>{
        option.method="DELETE";
        return customFetch(url,option)
    };
    return{
        Get,
        Post,
        Put,
        Del
    }

}