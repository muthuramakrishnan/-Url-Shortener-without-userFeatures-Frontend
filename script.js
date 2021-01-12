populateData();
createShortUrl();
async function populateData(){
    try{
        let response = JSON.parse(await getUrlData());
        console.log(response)     

        let table = document.querySelector('#urlTable');
        let tBody = document.createElement('tbody');
    
        response.forEach(function(data){
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.setAttribute('style','max-width: 900px; word-wrap:break-word');
            let a = document.createElement('a');
            a.setAttribute('href','https://urlshortener-backend-wo-user.herokuapp.com/'+data.fullUrl);
            a.innerText = data.fullUrl;
            td.append(a);
            tr.append(td);

            td = document.createElement('td');
            a = document.createElement('a');
            a.setAttribute('href',data.shortUrl);
            a.innerText = data.shortUrl;
            td.append(a);
            tr.append(td);

            td = document.createElement('td');
            td.innerText = data.clicks;
            tr.append(td);
            tBody.append(tr);
    });
    table.append(tBody);
}
    catch(error){
        console.error(error);
    }
}
function getUrlData(){
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET','https://urlshortener-backend-wo-user.herokuapp.com/shortUrls',true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status==200)
            {
                resolve(xhr.responseText);
            }
            else if(xhr.readyState == 4 && xhr.status!=200)
            {
                reject('Internal Service Error');
            }
        }
        xhr.send();
    });
}
async function createShortUrl(){
    let createForm = document.getElementById('url-shortener-form');
    createForm.addEventListener('submit',async function(event){
        event.preventDefault();
        await sendCreateRequest();
        location.reload();
    })
    
}

function sendCreateRequest(){
    let fullUrl = document.getElementById('fullUrl').value;
    let jsonobj = {
        'fullUrl':fullUrl
    }
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        let url = 'https://urlshortener-backend-wo-user.herokuapp.com/shortUrls';
        let params = JSON.stringify(jsonobj);
        console.log(params)
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status==200)
            {
                resolve('CREATE SUCCESS');
                console.log('CREATE SUCCESS');
            }
            else if(xhr.readyState == 4 && xhr.status!=200)
            {
                reject('Internal Service Error');
            }
        }
        xhr.send(params);
    });
}
