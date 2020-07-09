// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/f7l6_S_LK/";
let model, labelContainer, maxPredictions;
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}
// 화면 로드되면 init 실행.
init();

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);
    var classList = new Array();
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2) * 100 + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;

        classList[i] = { 'className': prediction[i].className, 'probability': prediction[i].probability.toFixed(2) };
    }
    // 이미지 문자열로 인코딩해서 저장하기
    // imgData = getBase64Image(image.getAttribute('src'));
    localStorage.setItem('my_param', JSON.stringify({
        "my_img": image.getAttribute('src'),
        "classes": classList,
    }));
    console.log(localStorage.getItem('my_param'));
}
/* ----------------------------------------------------------------
            로컬스토리지 JSON 형태
//my_param
{
   "my_img":"none",
   "classes":[
      {
         "clssName":"엘사",
         "probability":"0.00"
      },
      {
         "clssName":"안나",
         "probability":"0.00"
      },
      {
         "clssName":"몬스터주식회사_부",
         "probability":"0.00"
      },
      {
         "clssName":"라푼젤",
         "probability":"0.00"
      },
      {
         "clssName":"모아나",
         "probability":"0.00"
      },
      {
         "clssName":"뮬란",
         "probability":"0.99"
      },
      {
         "clssName":"쟈스민",
         "probability":"0.00"
      }
   ]
}
---------------------------------------------------------------- */