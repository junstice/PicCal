/* 달력 로직 */
// 현재 시스템 Date object 선언
const today = new Date();
// 월 배열 선언
const month = new Array("jan", "feb", "mar", "apr",
                        "may", "jun", "jul", "aug",
                        "sep", "oct", "nov", "dec");
// 달력 타이틀 작성
document.getElementById("calTitle").innerHTML = `${today.getFullYear()}`;

/* 달력 생성하기 */
function makeMonth() {
    // HD 해상도 설정
    resHD();

    // 한 달씩 달력 그리기
    for (let i = 0; i < month.length; i++) {
        loadCalendar(month[i], i, today);
    }
}

/* 한 달의 달력 작성 */
function loadCalendar(strMon, idxMon, objDate) {
    // 작성하는 달의 첫째날
    const firstDate = new Date(objDate.getFullYear(), idxMon, 1);
    // 작성하는 달의 마지막 날
    const lastDate = new Date(objDate.getFullYear(), idxMon + 1, 0);
    // 월(strMon)에 해당하는 캘린더 dom get
    const tbCalendar = document.getElementById(strMon);
    
    // 캘린더 2행 이후의 행이 존재한다면 해당 행을 삭제
    while (tbCalendar.rows.length > 2) {
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    // 캘린더에 1행 추가
    let row = tbCalendar.insertRow();
    let index = 0;
    let cell;

    // 1일이 시작되기 전까지 공란을 생성
    for (let i = 0; i < firstDate.getDay(); i++) {
        cell = row.insertCell();
        index = index + 1;
    }

    // 1일 ~ 마지막 날까지 입력
    for (let valDate = 1; valDate <= lastDate.getDate(); valDate++) {
        cell = row.insertCell();
        cell.innerHTML = valDate;

        // 일요일
        if (index % 7 == 0) {
            cell.innerHTML = `<font color=#ff0066>${valDate}`;
        }

        // 토요일
        if (index % 7 == 6) {
            cell.innerHTML = `<font color=#0066ff>${valDate}`;
            row = tbCalendar.insertRow();
        }

        // 오늘 날짜 강조 표시
        // * 조건 *
        // 시스템 연도 == 현재 작성 연도
        // && 시스템 월 == 현재 작성 월
        // && 시스템 일 == 현재 작성 일
        if (today.getFullYear() == objDate.getFullYear()
            && today.getMonth() == idxMon
            && today.getDate() == valDate) {
                cell.bgColor = `#FAF58C`;
        }

        index = index + 1;
    }
}

/* 배경 설정 */
// 이미지 선택
const fileSelect = document.getElementById("fileSelect");
// 업로드 파일
const fileElem = document.getElementById("fileElem");
// 이미지 저장
const screenshot = document.getElementById("screenshot");

fileSelect.addEventListener("click", () => {
    if (fileElem) {
        fileElem.click();
    }
}, false);

fileElem.addEventListener("change", () => {
    const file = fileElem.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById("piccal-bg-img").style.backgroundImage = `url(${reader.result})`;
        document.getElementById("piccal-bg-img").style.backgroundRepeat = `no-repeat`;
        document.getElementById("piccal-bg-img").style.backgroundPosition = `center center`;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}, false);

// HTML2CANVAS
// To render an element with html2canvas with some (optional) options, simply call html2canvas(element, options);
screenshot.addEventListener("click", () => {
    html2canvas(document.getElementById("piccal-bg-img")).then(function(canvas) {
        const a = document.createElement("a");
        if (typeof a.download === "string") {
            a.href = canvas.toDataURL("image/png");
            a.download = "piccal-download-image.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            window.open(canvas.toDataURL("image/png"));
        }
    });
}, false);

// 라디오 버튼 이벤트 정의
const radios = document.getElementsByName("radio_res");
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (e) {
        setCalRes(e.returnValue, radios[i].id);
    }, false);
}

/* 배경 해상도 설정 */
function setCalRes(val, rid) {
    if (val === true) {
    if (rid === "res_fhd") {
        resFHD();
    } else if (rid === "res_hd") {
        resHD();
    }
    }
}

/* 배경 이미지 크기 맞추기 */
const radios_pos = document.getElementsByName("radio_img_size");
for (let i = 0; i < radios_pos.length; i++) {
    radios_pos[i].addEventListener("change", function(e) {
        setImgPosition(e.returnValue, radios_pos[i].id);
    }, false);
}

function setImgPosition(val, rid) {
    if (val === true) {
        switch (rid) {
            case "auto":
            document.getElementById("piccal-bg-img").style.backgroundSize = `auto`;
            break;
            case "width":
            document.getElementById("piccal-bg-img").style.backgroundSize = `100% auto`;
            break;
            case "height":
            document.getElementById("piccal-bg-img").style.backgroundSize = `auto 100%`;
            break;
            case "full":
            document.getElementById("piccal-bg-img").style.backgroundSize = `100% 100%`;
            break;
        }
    }
}

// 배경색 이벤트 정의
const bgColor = document.getElementById("bgColorPicker");
bgColor.addEventListener("change", function(e) {
    document.getElementById("piccal-bg-img").style.backgroundColor = e.target.value;
}, false);

function resFHD() {
    document.getElementById("piccal-bg-img").style.width = "1920px";
    document.getElementById("piccal-bg-img").style.height = "1080px";
}

function resHD() {
    document.getElementById("piccal-bg-img").style.width = "1280px";
    document.getElementById("piccal-bg-img").style.height = "720px";
}

/* 연도 설정 */
var newYear;
const numYear = document.getElementById("yearText");
numYear.addEventListener("click", () => {
    const initYear = document.getElementById("calTitle");
    if (!initYear) return;
    
    const inputNum = document.createElement("input");          
    inputNum.type = "number"
    inputNum.value = newYear ? newYear : today.getFullYear();
    inputNum.style = "width: 85px; font-size: 25px; font-weight: bold; float: left; color: blue;";
    inputNum.id = "setYear";
    inputNum.min = "1900";
    inputNum.max = "2150";
    inputNum.onkeydown = () => {
        return false;
    }
    
    numYear.appendChild(inputNum);
    numYear.removeChild(initYear);
    inputNum.focus();
}, false);

numYear.addEventListener("focusout", () => {
    const inputNum = document.getElementById("setYear");

    const editedYear = document.createElement("h3");
    editedYear.className = "text-left";
    editedYear.id = "calTitle";
    editedYear.innerHTML = inputNum.value;

    newYear = inputNum.value;
    
    numYear.appendChild(editedYear);
    numYear.removeChild(inputNum);

    for (let i = 0; i < month.length; i++) {
        loadCalendar(month[i], i, new Date(newYear, 0, 1));
    }
}, false);

const info = document.getElementById("infoBtn");
info.addEventListener("click", () => {
    openNav("info");
}, false);

const tool = document.getElementById("toolBtn");
tool.addEventListener("click", () => {
    openNav("tool");
}, false);

/* Open when someone clicks on the span element */
function openNav(str) {
    if (str === "info") {
        document.getElementById("infoNav").style.width = "30%";
    }
    else if (str === "tool") {
        document.getElementById("toolNav").style.width = "20%";
    }
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav(str) {
    if (str === "info") {
        document.getElementById("infoNav").style.width = "0%";
    }
    else if (str === "tool") {
        document.getElementById("toolNav").style.width = "0%";
    }
}