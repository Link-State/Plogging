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
    plasticAmount.innerHTML = " : N개";
    plasticAmount.id = 'plasticAmount';

    // 아이템 리스트
    let shopItemList = document.createElement('div');
    shopItemList.id = 'shopItemList';

    // 아이템 생성
    let registItem = (item) => {
        let itemSlot = document.createElement('div');
        let name = document.createElement('span');
        let cost = document.createElement('span');

        name.innerHTML = ITEMLIST[item]['name'];
        name.id = item + "_name";
        name.className = "itemName";
        cost.innerHTML = "가격 : " + ITEMLIST[item]['cost'] + "개";
        cost.id = item + "_cost";
        cost.className = 'itemCost';
        itemSlot.onclick = buyItem;
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

    plastic.appendChild(plasticIco);
    plastic.appendChild(plasticAmount);
    shop.appendChild(back);
    shop.appendChild(plastic);
    shop.appendChild(shopItemList);
    BODY.appendChild(shop);
}

// 상점 화면 토글
function showView(t = undefined) {
    let shop = document.getElementById('shop');

    if (t === true) {
        shop.style.display = 'block';
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
        }
    }
}

function buyItem(e) {
    let answer = confirm("아이템을 구매하시겠습니까?");
    if (answer) {
        
    }
}

console.log('loaded shop.js');