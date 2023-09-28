const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = "live_wiz4aqvBqVsAYTvONpjBSdJi36tcSZFkpbCW2Th87HIudJ0Gnt4hFcFkL1FLAJel";


//колекція порід

export function fetchBreeds () {
        return  fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`) //повертається проміс. тому можна зен юзати
        .then(resp => {
            console.log(resp)
            if(!resp.ok){
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
        // .then(result => {
        //     console.log(result);
        // })
        .catch(error => console.log(error))

} 

//Інформація про кота

export function fetchCatByBreed(breedId) {
    return  fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`) //повертається проміс. тому можна зен юзати
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    });

} 

