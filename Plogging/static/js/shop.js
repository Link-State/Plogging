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

    let shopHeader = document.createElement('div');
    shopHeader.id = "shopHeader";

    // 이름
    let shopTitle = document.createElement('div');
    shopTitle.innerHTML = "독수리 상점";
    shopTitle.id = "shopTitle";

    // 플라스틱
    let plasticInfo = document.createElement('div');
    plasticInfo.id = 'plasticInfo';

    // 플라스틱 이미지 또는 아이콘
    let plasticIco = document.createElement('i');
    plasticIco.className = 'fa-solid fa-bottle-water';
    plasticIco.id = 'plasticIco';

    // 보유 플라스틱 수량
    let plasticAmount = document.createElement('span');
    plasticAmount.innerHTML = " : " + PLASTIC + "개";
    plasticAmount.id = 'plasticAmount';

    // 아이템 리스트
    let shopItemList = document.createElement('div');
    shopItemList.id = 'shopItemList';

    plasticInfo.appendChild(plasticIco);
    plasticInfo.appendChild(plasticAmount);
    shopHeader.appendChild(shopTitle);
    shopHeader.appendChild(plasticInfo);
    shop.appendChild(back);
    shop.appendChild(shopHeader);
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
        itemSlot.id = item;
        itemSlot.className = "itemSlot";

        let itemPreview = document.createElement('div');
        itemPreview.id = item + "_itemPreview";
        itemPreview.className = "itemPreview";

        let itemImage = document.createElement('div');
        itemImage.style.backgroundImage = "url(" + PATH + "/static/image/" + item + ".png" + ")";
        itemImage.id = item + "_itemImage";
        itemImage.className= "itemImage";

        let itemInfo = document.createElement('div');
        itemInfo.id = item + "_itemInfo";
        itemInfo.className = "itemInfo";

        let itemName = document.createElement('div');
        itemName.innerHTML = ITEMLIST[item]['name'];
        itemName.id = item + "_itemName";
        itemName.className = "itemName";

        let itemCost = document.createElement('div');
        itemCost.id = item + "_itemCost";
        itemCost.className = "itemCost";

        let itemDescript = document.createElement('div');
        itemDescript.innerHTML = ITEMLIST[item]['descript'];
        itemDescript.id = item + "_itemDescript";
        itemDescript.className = "itemDescript";

        let itemBuyBtn = document.createElement('div');
        itemBuyBtn.style.display = "none";
        itemBuyBtn.innerHTML = "구매";
        itemBuyBtn.id = item + "_itemBuyBtn";
        itemBuyBtn.className = "itemBuyBtn";
        itemBuyBtn.value = item;

        let itemEquipBtn = document.createElement('div');
        itemEquipBtn.style.display = "none";
        itemEquipBtn.id = item + "_itemEquipBtn";
        itemEquipBtn.className = "itemEquipBtn";
        itemEquipBtn.value = item;

        if (INVENTORY[item] !== undefined) {
            let slot = "slot" + ITEMLIST[item]['slot'];

            itemCost.innerHTML = "보유 중";
            itemEquipBtn.onclick = itemEquip;
            itemEquipBtn.style.display = "flex";

            if (EQUIPED[slot] === item) {
                itemEquipBtn.innerHTML = "해제";
            }
            else {
                itemEquipBtn.innerHTML = "적용";
            }
        }
        else {
            itemCost.innerHTML = "플라스틱 " + ITEMLIST[item]['cost'] + "개";
            itemBuyBtn.onclick = buyItem;
            itemBuyBtn.style.display = "flex";
        }

        itemPreview.appendChild(itemImage);
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemCost);
        itemSlot.appendChild(itemPreview);
        itemSlot.appendChild(itemInfo);
        itemSlot.appendChild(itemDescript);
        itemSlot.appendChild(itemBuyBtn);
        itemSlot.appendChild(itemEquipBtn);
        
        return itemSlot;
    };

    let keys = Object.keys(ITEMLIST);
    for (let key of keys) {
        shopItemList.appendChild(registItem(key));
    }
}

// 아이템 구매
function buyItem(e) {
    let itemName = e.target.value;
    let answer = requestMessage("아이템을 구매하시겠습니까?");

    if (answer) {
        SOCKET.emit('request', {'msg':'buyItem', 'data':{'itemName':itemName}});
    }
}

// 아이템 적용 / 해제
function itemEquip(e) {
    let itemName = e.target.value;
    let slot = "slot" + ITEMLIST[itemName]['slot'];
    let itemSlot = document.getElementById(slot);
    let msg = (EQUIPED[slot] === undefined || EQUIPED[slot] !== itemName) ? "적용" : "해제";
    let answer = requestMessage("아이템을 " + msg + "하시겠습니까?");
    if (answer) {
        if (msg === "적용") {
            SOCKET.emit('request', {'msg':'equipItem', 'data':{'type':"equip", 'itemName':itemName}});
            if (EQUIPED[slot] !== undefined) {
                let originItem = document.getElementById(EQUIPED[slot] + "_itemEquipBtn");
                originItem.innerHTML = "적용";
            }
            itemSlot.style.backgroundImage = "url(" + PATH + "/static/image/" + itemName + ".png" + ")";
            itemSlot.value = itemName;
            EQUIPED[slot] = itemName;
            e.target.innerHTML = "해제";
        }
        else {
            SOCKET.emit('request', {'msg':'equipItem', 'data':{'type':"unmountItem", 'itemName':itemName}});
            itemSlot.style.backgroundImage = "";
            itemSlot.value = "";
            delete EQUIPED[slot];
            e.target.innerHTML = "적용";
        }
    }
}

console.log('loaded shop.js');