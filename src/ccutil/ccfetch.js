export function CCFetch(url,param){
    url = "http://localhost:8080" + url;
    return fetch(url,{
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(param)
  }).then(response => response.json())
    .then((res) => {
        return res
    })
}