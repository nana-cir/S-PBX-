document.addEventListener('DOMContentLoaded', () => {
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
    document.getElementById('update-date').textContent = `※${data.lastUpdated} 現在の単価です`;
    const container = document.getElementById('item-list');
    
    data.items.forEach(item => {
        // バッジの表示（初期 or 月額）
        const typeBadge = item.type === 'initial' 
            ? '<span class="badge initial">初期</span>' 
            : '<span class="badge monthly">月額</span>';

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-row';
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-header">
                    ${typeBadge}
                    <span class="item-name">${item.name}</span>
                </div>
                <span class="item-price">@${item.price.toLocaleString()}円 / ${item.unit}</span>
            </div>
            <div class="item-input">
                <input type="number" min="0" 
                    data-price="${item.price}" 
                    data-type="${item.type}" 
                    placeholder="0" class="qty-input">
                <span class="unit-label">${item.unit}</span>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    const inputs = document.querySelectorAll('.qty-input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
}

function calculateTotal() {
    let initialTotal = 0;
    let monthlyTotal = 0;
    const inputs = document.querySelectorAll('.qty-input');

    inputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        const price = parseInt(input.dataset.price);
        const type = input.dataset.type;

        if (type === 'initial') {
            initialTotal += qty * price;
        } else {
            monthlyTotal += qty * price;
        }
    });

    // 表示更新関数（税率10%）
    updateDisplay('initial', initialTotal);
    updateDisplay('monthly', monthlyTotal);

    // スクショ案内
    const msgBox = document.getElementById('screenshot-msg');
    if (initialTotal > 0 || monthlyTotal > 0) {
        msgBox.style.display = 'block';
    } else {
        msgBox.style.display = 'none';
    }
}

function updateDisplay(type, amount) {
    const taxRate = 0.10;
    const taxAmount = Math.floor(amount * taxRate);
    const totalIn = amount + taxAmount;

    // 税別
    document.getElementById(`${type}-price-ex`).textContent = amount.toLocaleString() + ' 円';
    // 税込
    document.getElementById(`${type}-price-in`).textContent = totalIn.toLocaleString() + ' 円';
}
