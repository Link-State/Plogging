
function loadShop() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 상점
    let shop = document.createElement('div');
    shop.style.display = 'none';
    shop.id = 'shop';

    // 플라스틱
    let plastic = document.createElement('div');
    plastic.innerHTML = '플라스틱(아이콘) : N';
    plastic.id = 'plastic';

    // 플라스틱 아이콘
    let plasticIco = document.createElement('i');
    plasticIco.className = 'fa-duotone fa-bottle-water';
    plasticIco.id = 'plasticIco';

    // 보유 플라스틱
    let plasticAmount = document.createElement('div');
    plasticAmount.id = 'plasticAmount';

    plastic.appendChild(plasticIco);
    plastic.appendChild(plasticAmount);
    shop.appendChild(plastic);
    BODY.appendChild(shop);
}

console.log('loaded shop.js');