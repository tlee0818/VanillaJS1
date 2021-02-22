const body = document.querySelector("body");

const NUM_IMAGES = 7;

function getRandom(){
    return Math.floor(Math.random() * NUM_IMAGES) + 1;
}

function handleImgLoad(event){

}


function paintImage(imgNum){
    const image = new Image();
    image.src = `./images/${imgNum}.jpg`;
    const h = image.clientHeight;
    const w = image.clientWidth;
    console.log(h, w)
    if(h >= w){
        image.classList.add("bgImageWide")
    } else {
        image.classList.add("bgImageTall")
    }

    body.prepend(image);
}

function init(){
    const imgNum = getRandom();
    paintImage(imgNum);
}

init();