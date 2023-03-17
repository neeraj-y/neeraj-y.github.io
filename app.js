let scanEleClassList = null;
let homeEleClassList = null;

function handleStartScan() {
  document.querySelector("body").classList.add("scan");
  homeEleClassList.remove("show");
  homeEleClassList.add("hide");

  scanEleClassList.remove("hide");
  scanEleClassList.add("show");
}

function handleClose() {
  document.querySelector("body").classList.remove("scan");
  toggleImgErr();
  scanEleClassList.remove("show");
  scanEleClassList.add("hide");

  homeEleClassList.remove("hide");
  homeEleClassList.add("show");
}

function toggleImgErr(msg = "") {
  // img error ref
  const imgErrElem = document.querySelector(".err");
  imgErrElem.querySelector("span").innerHTML = msg;

  if (!msg) {
    imgErrElem.classList.remove("show");
    imgErrElem.classList.add("hide");
  } else {
    imgErrElem.classList.remove("hide");
    imgErrElem.classList.add("show");
  }
}

function handleImgUpload() {
  toggleImgErr();
  //Get reference of FileUpload.
  const fileUpload = document.getElementById("file-input");

  //Check whether the file is valid Image.
  const regex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.jpg|.jpeg|.png|.gif)$");
  if (regex.test(fileUpload.value.toLowerCase())) {
    //Check whether HTML5 is supported.
    if (typeof fileUpload.files != "undefined") {
      //Initiate the FileReader object.
      var reader = new FileReader();
      //Read the contents of Image File.
      reader.readAsDataURL(fileUpload.files[0]);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          if (height > 100 || width > 100) {
            toggleImgErr("Height and Width must not exceed 100px.");
            return false;
          }
          toggleImgErr("Uploaded image has valid Height and Width.");
          return true;
        };
      };
    } else {
      toggleImgErr("This browser does not support HTML5.");
      return false;
    }
  } else {
    toggleImgErr("Please select a valid Image file.");
    return false;
  }
}

function handleBootstrap() {
  const startScan = document.querySelector("#start-scan");
  const startUpload = document.querySelector("#file-input");
  const close = document.querySelector("#close");

  // init class elements
  scanEleClassList = document.querySelector(".scan").classList;
  homeEleClassList = document.querySelector(".home").classList;

  // handle - click to get started
  startScan.addEventListener("click", handleStartScan);

  // handle - close
  close.addEventListener("click", handleClose);

  // handle image upload
  startUpload.addEventListener("change", handleImgUpload);
}

window.addEventListener("load", handleBootstrap);
