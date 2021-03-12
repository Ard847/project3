const fetcher = async (url, method, body, token) => {

  const parameters = {
    method: method,
    headers: {},
  };

  if (body) {
    parameters.body = JSON.stringify(body);
    parameters.headers['Content-Type'] = 'application/json';
  }

  if(token){
    parameters.headers['Authorization'] = 'Bearer ' + token;
  }

  try {
    const fetchData = await fetch(url, parameters);
    const response = await fetchData.json();
    console.log('Success:', response);
    return response;

  } catch (err) {
    console.error('Error:', err);
    return err;
  
  }

}


export default fetcher;

