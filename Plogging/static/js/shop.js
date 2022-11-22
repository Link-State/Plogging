let INVENTORY = {};

function loadShop() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 상점
    let shop = document.createElement('div');
    shop.style.display = 'none';
    shop.id = 'shop';

    // 닫기
    let back = document.createElement('div');
    back.innerHTML = 'X';
    back.onclick = showView;
    back.id = 'closeShopView';
    back.className = 'back';

    // 플라스틱
    let plastic = document.createElement('div');
    plastic.id = 'plastic';

    // 플라스틱 이미지 또는 아이콘
    let plasticIco = document.createElement('i');
    plasticIco.className = 'fa-solid fa-bottle-water';
    plasticIco.id = 'plasticIco';

    // 보유 플라스틱
    let plasticAmount = document.createElement('span');
    plasticAmount.innerHTML = " : " + PLASTIC + "개";
    plasticAmount.id = 'plasticAmount';

    // 아이템 리스트
    let shopItemList = document.createElement('div');
    shopItemList.id = 'shopItemList';

    plastic.appendChild(plasticIco);
    plastic.appendChild(plasticAmount);
    shop.appendChild(back);
    shop.appendChild(plastic);
    shop.appendChild(shopItemList);
    BODY.appendChild(shop);
    console.log("loaded shop window");
}

// 상점 화면 토글
function showView(t = undefined) {
    let shop = document.getElementById('shop');

    if (t === true) {
        shop.style.display = 'block';
        SOCKET.emit('request', {'msg':'updateShop'});
    }
    else if (t === false) {
        shop.style.display = 'none';
    }
    else {
        if (shop.style.display != 'none') {
            shop.style.display = 'none';
        }
        else {
            shop.style.display = 'block';
            SOCKET.emit('request', {'msg':'updateShop'});
        }
    }
}

// 상점 아이템리스트 업데이트
function updateItemList() {
    let plasticAmount = document.getElementById('plasticAmount');
    let shopItemList = document.getElementById('shopItemList');
    
    while (shopItemList.hasChildNodes()) {
        shopItemList.firstChild.remove();
    }

    plasticAmount.innerHTML = " : " + PLASTIC + "개";

    // 아이템 생성
    let registItem = (item) => {
        let itemSlot = document.createElement('div');
        let name = document.createElement('span');
        let cost = document.createElement('span');

        if (INVENTORY[item] !== undefined) {
            name.innerHTML = "이미 보유중";
            itemSlot.onclick = itemEquip;
        }
        else {
            name.innerHTML = ITEMLIST[item]['name'];
            cost.innerHTML = "가격 : " + ITEMLIST[item]['cost'] + "개";
            itemSlot.onclick = buyItem;
        }
        name.id = item + "_name";
        name.className = "itemName";
        cost.id = item + "_cost";
        cost.className = 'itemCost';
        itemSlot.id = item;
        itemSlot.className = "itemSlot";
        itemSlot.style.backgroundImage = "url(" + PATH + "/static/image/" + item + ".png" + ")";

        itemSlot.appendChild(name);
        itemSlot.appendChild(cost);
        return itemSlot;
    };

    let keys = Object.keys(ITEMLIST);
    for (let key of keys) {
        shopItemList.appendChild(registItem(key));
    }
}

// 아이템 구매
function buyItem(e) {
    let answer = requestMessage("아이템을 구매하시겠습니까?");
    e.target.onclick = '';

    if (answer) {
        SOCKET.emit('request', {'msg':'buyItem', 'data':{'itemName':e.target.id}});
    }
    else {
        e.target.onclick = buyItem;
    }
}

// 아이템 장착 / 해제
function itemEquip(e) {
    let slot = "slot" + ITEMLIST[e.target.id]['slot'];
    let itemSlot = document.getElementById(slot);
    let msg = (EQUIPED[slot] === undefined || EQUIPED[slot] !== e.target.id) ? "장착" : "해제";
    let answer = requestMessage("아이템을 " + msg + "하시겠습니까?");
    if (answer) {
        if (msg === "장착") {
            itemSlot.style.backgroundImage = "url(" + PATH + "/static/image/" + e.target.id + ".png" + ")";
            itemSlot.value = itemSlot;
            EQUIPED[slot] = e.target.id;
            SOCKET.emit('request', {'msg':'equipItem', 'data':{'type':"equip", 'itemName':e.target.id}});
        }
        else {
            itemSlot.style.backgroundImage = "";
            itemSlot.value = "";
            delete EQUIPED[slot];
            SOCKET.emit('request', {'msg':'equipItem', 'data':{'type':"unmountItem", 'itemName':e.target.id}});
        }
    }
}

console.log('loaded shop.js');