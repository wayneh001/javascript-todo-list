const text = document.querySelector("#text");
const add = document.querySelector("#add");
const tab = document.querySelector(".tab");
const generateList = document.querySelector("#todo_list");
const undoneCount = document.querySelector("#undone_count");

let obj = {};
let data = [];
let tempData = [];
let count = 0;
let currentTab = "全部";

// 渲染畫面
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
  undoneCount.innerText = count;
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
  count++;
  renderData(data);
  text.value = "";
  obj = {};
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
  if (currentTab == "待完成") {
    tempData = data.filter(function (data) {
      return data.checked == false;
    });
  } else if (currentTab == "已完成") {
    tempData = data.filter(function (data) {
      return data.checked == true;
    });
  } else {
    tempData = data;
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

// 刪除單筆待辦事項
function deleteItem(num) {
  data.splice(num, 1);
}

// 變更單筆待辦事項
generateList.addEventListener("click", function (e) {
  if (e.target.className !== "delete") {
    let num = e.target.getAttribute("data-num");
    if (currentTab === '全部') {
        checkToggle(data[num]);
    } else {
        checkToggle(tempData[num]);
    }
    return;
  } else {
    let num = e.target.getAttribute("data-num");
    if (data[num].checked == false) {
      count--;
    }
    deleteItem(num);
    renderData(data);
  }
});

// 清除已完成項目
function clean(data) {
  for (i = data.length - 1; i >= 0; i--) {
    if (data[i].checked == true) {
      deleteItem(i);
    }
  }
  renderData(data);
}
