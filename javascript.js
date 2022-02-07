const text = document.querySelector('#text');
const add = document.querySelector('#add');
const tab = document.querySelector('.tab');
const generateList = document.querySelector('#todo_list');
const undoneCount = document.querySelector('undone_count');

let data = [];
let obj = {};

// 初始化
function renderData(filterData) {
    str = '';
    filterData.forEach(function (item, index) {
        str += `
        <li>
            <label class="checkbox" for="">
                <input type="checkbox" onClick="checked(this)"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
        </li>`
    })
    const list = document.querySelector('#todo_list');
    list.innerHTML = str;

}

// 新增待辦事項
add.addEventListener('click', function (e) {
    if (text.value == '') {
        alert('請輸入待辦事項')
        return;
    }
    obj.content = text.value;
    obj.checked = false;
    console.log(obj);
    data.push(obj);
    renderData(data);
    text.value = '';
    obj = {};
})

// 切換標籤與過濾
tab.addEventListener('click', function (e) {
    const tabs = document.querySelectorAll('.tab li')
    let tempData = [];
    tabs.forEach(function (item) {
        item.classList.remove('active');
        if (e.target.textContent === '全部') {
            e.target.classList.add('active');
            renderData(data);
        } else if (e.target.textContent === '待完成') {
            e.target.classList.add('active');
            tempData = data.filter(function(item) {
                return item.checked === false;
            })
            renderData(tempData);
        } else if (e.target.textContent === '已完成') {
            e.target.classList.add('active');
            tempData = data.filter(function(item) {
                return item.checked === true;
            })
            renderData(tempData);
        }
        tempData = [];
    })
})

function checked() {
    obj.checked != obj.checked;
}

// 變更單筆待辦事項
generateList.addEventListener('click', function (e) {
    let num = e.target.getAttribute('data-num');
    if (e.target.className !== 'delete') {
        checked();
    } else {
        data.splice(num, 1);
    }
    renderData()
})