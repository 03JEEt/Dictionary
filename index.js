function upper(ele){
    return ele.charAt(0).toUpperCase()+ele.slice(1)
}
function ans(){
    b=document.getElementById('gsearch').value
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${b}`)
	.then(response => response.json())
	.then((response) => {
        words=upper(response[0].word)
        pos=upper(response[0].meanings[0].partOfSpeech)
        phon=response[0].phonetic;
        if(phon)
        s=", "+phon;
        else
        s=""
        document.getElementById('result').innerHTML=`
        <h4 id="ans">${words}</h4>
        <h5 id="pos">${pos}  ${s}</h5>
        
        <span id="def">Defination: </span>
        <span id="get">${response[0].meanings[0].definitions[0].definition} </span>
        `
        
        anto=response[0].meanings[0].antonyms[0]
        syno=response[0].meanings[0].synonyms[0]
        if(anto){
            anto=upper(anto)
            document.getElementById('anto').innerHTML=`
            <span class="same">Antonym: </span> <span>${anto}</span>
            `
        }
        else{
            document.getElementById('anto').innerHTML=""

        }
        if(syno){
            syno=upper(syno)
            document.getElementById('syno').innerHTML=`
            <span class="same">Synonym: </span> <span>${syno}</span>
            `
        }
        else{
            document.getElementById('syno').innerHTML=""
        }
        ur=`${response[0].phonetics[0].audio}`
        sound=new Audio(ur)
        sound.play()
        
    })
	.catch((err) =>{
        document.getElementById('result').innerHTML="No Answer!!!!!"
        document.getElementById('syno').innerHTML="";
        document.getElementById('anto').innerHTML="";
    } );

}


    window.onload=function(){
    document.getElementById('find').addEventListener('click',ans);
    document.getElementById('Clear').addEventListener('click',()=>{
        document.getElementById('gsearch').value="";
        document.getElementById('result').innerHTML="";
        document.getElementById('syno').innerHTML="";
        document.getElementById('anto').innerHTML="";
        
    })
    }
   