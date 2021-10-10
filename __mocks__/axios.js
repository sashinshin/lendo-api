const postData = {
    data: {    
        id: "e22a30af-55bf-4e1a-a186-850fb6eb49da",
        status: "pending",
        first_name: "John",
        last_name: "Doe",
    },
};

const getData = {
    data: {    
        id:"e02d142c-f8e6-4a59-8d0d-b7986b77e60a", 
        application_id:"e22a30af-55bf-4e1a-a186-850fb6eb49da", 
        status:"rejected" 
    },
};

const axiosGet = () => {
    return Promise.resolve(getData);
};

const axiosPost = (url, data) => {
    console.log(data);
    if (data.status === 'error') {
       return Promise.resolve({ data: { error: 'the request payload is not valid.' }});
    }
    return Promise.resolve(postData);
};

module.exports =  {
    get: jest.fn((url) => axiosGet(url)),
    post: jest.fn((url, data) => axiosPost(url, data)),
};
