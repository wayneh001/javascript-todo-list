const text = document.querySelector("#text");
const add = document.querySelector("#add");
const tab = document.querySelector(".tab");
const generateList = document.querySelector("#todo_list");
const undoneCount = document.querySelector("#undone_count");

let obj = {}; // 待辦事項物件
let dataNum = 0;
let data = []; // 完整的儲存資料
let tempData = []; // 渲染時的暫時資料
let count = 0; // 加總
let currentTab = "全部"; // 現在所處標籤

// 渲染畫面
function renderData(value) {
  str = "";
  value.forEach(function (item) {
    str += `
        <li>
            <label class="checkbox" for="">
                <input class="inputStyle" ${item.checked ? 'checked' : ''} type="checkbox" data-num="${item.dataNum}"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${item.dataNum}"></a>
        </li>`;
  });
  // 將 data-num 設定為不隨 filtering 改變的永久序列屬性
  // console.log(value);
  const list = document.querySelector("#todo_list");
  list.innerHTML = str;
  undoneCount.innerText = count;
}

// 新增待辦事項
add.addEventListener("click", function (e) {
  if (text.value == "") {
    alert("請輸入待辦事項");
    return;
  }
  obj.content = text.value.trim();
  obj.checked = false;
  obj.dataNum = dataNum;
  obj.delete = false;
  dataNum++;
  data.push(obj);
  count++;
  text.value = "";
  obj = {};
  filtering();
});

// 切換標籤
tab.addEventListener("click", function (e) {
  const tabs = document.querySelectorAll(".tab li");
  tabs.forEach(function (item) {
    item.classList.remove("active");
    if (e.target.textContent === "待完成") {
      e.target.classList.add("active");
      currentTab = "待完成";
    } else if (e.target.textContent === "已完成") {
      e.target.classList.add("active");
      currentTab = "已完成";
    } else {
      e.target.classList.add("active");
      currentTab = "全部";
    }
  });
  filtering();
});

// 過濾
function filtering() {
  if (currentTab === "待完成") {
    tempData = data.filter(function (item) {
      return item.checked == false && item.delete == false;
    });
  } else if (currentTab === "已完成") {
    tempData = data.filter(function (item) {
      return item.checked == true && item.delete == false;
    });
  } else {
    tempData = data.filter(function (item) {
      return item.delete == false;
    });
  }
  renderData(tempData);
}

// checkbox 開關
function checkToggle(item) {
  item.checked = !item.checked;
  if (item.checked == true) {
    count--;
  } else {
    count++;
  }
  filtering();
}

// 變更單筆待辦事項
generateList.addEventListener("click", function (e) {
  let num = e.target.getAttribute("data-num");
  if (e.target.className == "inputStyle") {
    checkToggle(data[num]);
    return;
  } else if (e.target.className == "delete") {
    deleteItem(num);
  }
});

// 刪除功能
function deleteItem(num) {
  data[num].delete = true; // 不將 data 中的物件真的移除，改為將其 delete 屬性設定為 true
  count--;
  filtering();
}

// 清除已完成項目
function clean(data) {
  data.forEach(function (item) {
    if (item.checked == true) {
      item.delete = true
    }
  })
  filtering();
}
