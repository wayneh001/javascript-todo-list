const text = document.querySelector("#text");
const add = document.querySelector("#add");
const tab = document.querySelector(".tab");
const generateList = document.querySelector("#todo_list");

let obj = {};
let data = [];
let tempData = [];

// 初始化
function renderData(value) {
  str = "";
  value.forEach(function (item, index) {
    if (item.checked == true) {
      str += `
        <li>
            <label class="checkbox" for="">
                <input class="inputStyle" checked type="checkbox" data-num="${index}"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
        </li>`;
    } else {
      str += `
        <li>
            <label class="checkbox" for="">
                <input class="inputStyle" type="checkbox" data-num="${index}"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
        </li>`;
    }
  });
  const list = document.querySelector("#todo_list");
  list.innerHTML = str;
}

// 新增待辦事項
add.addEventListener("click", function (e) {
  if (text.value == "") {
    alert("請輸入待辦事項");
    return;
  }
  obj.content = text.value;
  obj.checked = false;
  data.push(obj);
  renderData(data);
  text.value = "";
  obj = {};
});

// 切換標籤與過濾
tab.addEventListener("click", function (e) {
  const tabs = document.querySelectorAll(".tab li");
  tabs.forEach(function (item) {
    item.classList.remove("active");
    if (e.target.textContent === "全部") {
      e.target.classList.add("active");
      tempData = data;
    } else if (e.target.textContent === "待完成") {
      e.target.classList.add("active");
      tempData = data.filter(function (item) {
        return item.checked == false;
      });
    } else if (e.target.textContent === "已完成") {
      e.target.classList.add("active");
      tempData = data.filter(function (item) {
        return item.checked == true;
      });
    }
    renderData(tempData);
    tempData = [];
  });
});

// checkbox 開關
function checkToggle(item) {
  item.checked = !item.checked;
}

// 變更單筆待辦事項
generateList.addEventListener("click", function (e) {
  if (e.target.className !== "delete") {
    let num = e.target.getAttribute("data-num");
    checkToggle(data[num]);
    return;
  } else {
    let num = e.target.getAttribute("data-num");
    console.log(data[num]);
    data.splice(num, 1);
  }
});
