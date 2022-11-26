
// 초기화
function init(code) {
    const BODY = document.getElementsByTagName('body').item(0);
    if (code === 1) {
        BODY.style.backgroundColor = "#000";

        let div = document.createElement('div');
        let inner_div1 = document.createElement('div');
        inner_div1.style.display = "flex";
        inner_div1.innerHTML = "학교";
        let inner_div2 = document.createElement('div');
        inner_div2.style.display = "flex";
        inner_div2.innerHTML = "키우깅";

        div.style.flexWrap = "wrap";
        div.style.justifyContent = "center";
        div.style.alignContent = "center";
        div.style.alignItems = "center";
        div.style.display = "flex";
        div.style.color = "#fff";
        div.style.fontSize = "3rem";
        div.style.textAlign = "center";
        div.style.position = "absolute";
        div.style.opacity = 0;
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.appendChild(inner_div1);
        div.appendChild(inner_div2);

        BODY.appendChild(div);
        
        div.animate([
            {opacity: 1}
        ], {
            delay : 1000,
            duration: 150,
            fill: "both"
        });

        div.animate([
            {opacity: 0}
        ], {
            delay : 2500,
            duration: 150,
            fill: "both"
        });
        
        div.animate([
            {opacity: 0}
        ], {
            delay : 3500,
            duration: 150,
            fill: "both"
        });

        BODY.animate([
            {backgroundColor: "#fff"}
        ], {
            delay : 3750,
            duration: 150,
            fill: "both"
        });

        setTimeout(function(){
            div.remove();
            loginForm(1);
        }, 3800);
    }
    else if (code === 0) {
        loginForm(0);
    }
}

function loginForm(code) {
    const BODY = document.getElementsByTagName('body').item(0);
    let rate = window.innerHeight / window.innerWidth;
    let rad = Math.atan(rate);

    let div = document.createElement('div');
    div.id = "login";

    let border = document.createElement('div');
    border.style.animation = "rotate 3s cubic-bezier(" + Math.cos(rad) + ", " + Math.sin(rad) + ", " + (1 - Math.cos(rad)) + ", " + (1 - Math.sin(rad)) + ") both";
    border.style.backgroundImage = "conic-gradient(from " + (90 + rad * (180 / Math.PI)) + "deg, rgba(0, 0, 0, 1) var(--ang), rgba(255, 255, 255, 0) 0%)";
    border.id = "border";

    let frame = document.createElement('div');
    frame.style.width = "49%";
    frame.style.height = (50 - (1/rate)) + "%";
    frame.id = "frame";

    let loginText = document.createElement('div');
    loginText.innerHTML = "로그인";
    loginText.id = "loginText";

    let loginFail = document.createElement('div');
    loginFail.innerHTML = "로그인실패";
    loginFail.id = "loginFail";

    let loginIcon = document.createElement('i');
    loginIcon.style.fontSize = "32pt";
    // loginIcon.onclick = () => {location.href = "http://" + document.domain + ":" + location.port + "/login";};
    loginIcon.onclick = () => {location.href = "https://" + document.domain + ":" + location.port + "/login";};
    loginIcon.innerText = "";
    loginIcon.className = "fa-brands fa-google";
    loginIcon.id = "loginIcon"

    if (code === 0) {
        frame.appendChild(loginFail);
    }
    frame.appendChild(loginText);
    frame.appendChild(loginIcon);
    div.appendChild(frame);
    div.appendChild(border);
    BODY.appendChild(div);
}

console.log("loaded intro.js");
