export default function makeId (L){
    var result = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characterLength = characters.length;

    for(var i = 0 ; i < L ; i++){
        result = result + characters.charAt(Math.floor(Math.random()*characterLength))
    }
    
    return result
}