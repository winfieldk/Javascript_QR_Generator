const wrap = document.querySelector(".wrap"),
    btn = wrap.querySelector(".form .btn"),
    qrInput = wrap.querySelector(".form input"),
    qrImg = wrap.querySelector(".qr-code img"),
    dwnBtn = wrap.querySelector(".qr-code .download");
let preValue;

btn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!qrValue) return;
    btn.innerText = "Generating QR Code...";

    if (qrValue.match(phone)) {
        qrValue = `tel:${qrValue}`
        console.log("This is phone number");
    }
    else if (qrValue.match(email)) {
        qrValue = `mailto:${qrValue}`
        console.log("This is an email ");
    }

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;

    qrImg.addEventListener("load", () => {
        wrap.classList.add("show");
        btn.innerText = "Generate QR Code";
    });

});

dwnBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}&download=1`;
    downloadURI(qrImg.src, 'QRCode1.png');
});

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
};

function showButton(value) {
    let download = `
        <a href="${value}" download> 
            <button>Download QR Code</button> 
        </a>
    `;
    qrImg.insertAdjacentHTML("afterend", download);

}

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrap.classList.remove("show");
        preValue = "";
    }
});



