const url= process.env.REACT_APP_API_URL;

export async function getPhotos(nextCursor){
    const params =new URLSearchParams();

    if(nextCursor){
        params.append('next_cursor' ,nextCursor);

    }
    
    const response= await fetch(`${url}photos?${params}`);
    const data= await response.json();
    return data;
    
}


export async function searchPhotos(expression){
    const params =new URLSearchParams();

        params.append('expression' ,expression);
    
    const response= await fetch(`${url}search?${params}`);
    const data= await response.json();
    return data;
    
}


