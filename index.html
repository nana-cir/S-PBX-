document.addEventListener('DOMContentLoaded', () => {
    // キャッシュ対策として現在時刻をパラメータに付与してJSONを取得
    fetch('data.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            initApp(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('update-date').textContent = 'データの読み込みに失敗しました';
        });
});

function initApp(data) {
    // 1. 更新日の表示
    document.getElementById('update-date').textContent = `※${data.lastUpdated} 現在の単価です`;

    const container = document.getElementById('item-list');
    
    // 2. 項目リストの生成
    data.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-row';
        itemDiv.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">@${item.price.toLocaleString()}円 / ${item.unit}</span>
            </div>
            <div class="item-input">
                <input type="number" min="0" data-price="${item.price}" placeholder="0" class="qty-input">
                <span class="unit-label">${item.unit}</span>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    // 3. 計算イベントの設定
    const inputs = document.querySelectorAll('.qty-input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
}

function calculateTotal() {
    let total = 0;
    const inputs = document.querySelectorAll('.qty-input');

    inputs.forEach(input => {
        const qty = parseInt(input.value) || 0; // 空欄は0として扱う
        const price = parseInt(input.dataset.price);
        total += qty * price;
    });

    // 合計金額の表示更新
    document.getElementById('total-price').textContent = total.toLocaleString() + ' 円';

    // 合計が0より大きい場合のみ、スクショ案内を表示
    const msgBox = document.getElementById('screenshot-msg');
    if (total > 0) {
        msgBox.style.display = 'block';
    } else {
        msgBox.style.display = 'none';
    }
}
