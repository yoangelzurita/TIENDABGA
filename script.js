// --- CONFIGURACIÓN Y ESTADO ---
const DB_KEY = 'inventario_multi_v1';
const RATE_KEY = 'tasa_cambio_v1';
let products = [];
let currentRate = 40.00;
let html5QrcodeScanner = null;
let scanMode = null;
let isScanning = false;

let cart = {};

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    // Cargar Tasa
    const storedRate = localStorage.getItem(RATE_KEY);
    if(storedRate) {
        currentRate = parseFloat(storedRate);
        document.getElementById('exchangeRate').value = currentRate.toFixed(2);
    }
    // Cargar Productos
    const storedProds = localStorage.getItem(DB_KEY);
    if(storedProds) products = JSON.parse(storedProds);
    
    renderProducts();

    // Evento para el buscador
    document.getElementById('searchInput').addEventListener('keyup', (e) => renderProducts(e.target.value));
});

// --- LÓGICA DE NEGOCIO Y TASA DE CAMBIO ---
window.updateRate = function(val) {
    currentRate = parseFloat(val);
    localStorage.setItem(RATE_KEY, currentRate);
    renderProducts(); 
    renderCart();
    // Recalcular en el modal de producto si está abierto
    calculateBsPrice();
}

/**
 * Función para calcular y mostrar el precio en Bs automáticamente.
 */
window.calculateBsPrice = function() {
    const priceUSD = parseFloat(document.getElementById('prodPrice').value);
    const displayElement = document.getElementById('displayBsPrice');
    
    if (!isNaN(priceUSD) && priceUSD > 0) {
        const priceBs = priceUSD * currentRate;
        displayElement.textContent = priceBs.toFixed(2);
    } else {
        displayElement.textContent = '0.00';
    }
}

window.saveProduct = function(e) {
    e.preventDefault();
    const code = document.getElementById('prodCode').value.trim();
    if(code && products.some(p => p.code === code)) {
        alert("Ese código ya existe.");
        return;
    }

    const newProd = {
        id: Date.now(),
        code: code,
        name: document.getElementById('prodName').value,
        priceUSD: parseFloat(document.getElementById('prodPrice').value),
        image: document.getElementById('prodImgBase64').value
    };

    products.unshift(newProd);
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(products));
    } catch(e) { alert("Memoria llena"); }
    
    renderProducts();
    closeModal('productModal');
    
    // Resetear el formulario y display de Bs
    e.target.reset();
    document.getElementById('previewImg').style.display = 'none';
    document.getElementById('prodImgBase64').value = '';
    document.getElementById('displayBsPrice').textContent = '0.00';
    
    alert("✅ Producto Agregado");
}

window.deleteProduct = function(id) {
    if(confirm("¿Eliminar?")) {
        products = products.filter(p => p.id !== id);
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(products));
        } catch(e) { alert("Memoria llena"); }
        renderProducts();
    }
}

// --- LÓGICA DEL CARRITO ---
window.addToCart = function(productId) {
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    alert("Producto agregado al carrito.");
    // No se llama a renderCart aquí ya que solo se ve al abrir el modal.
}

window.clearCart = function() {
    if(confirm("¿Estás seguro de vaciar el carrito?")) {
        cart = {};
        renderCart();
        alert("Carrito vaciado.");
        closeModal('cartModal');
    }
}

window.renderCart = function() {
    const itemsContainer = document.getElementById('cartItems');
    const totalUSDElement = document.getElementById('cartTotalUSD');
    const totalBSElement = document.getElementById('cartTotalBS');
    let totalUSD = 0;
    let itemsHTML = '';

    const cartProductIDs = Object.keys(cart);
    
    if (cartProductIDs.length === 0) {
        itemsHTML = '<p style="text-align: center; color: #6B7280; padding: 20px;">El carrito está vacío.</p>';
    } else {
        cartProductIDs.forEach(idStr => {
            const id = parseInt(idStr);
            const product = products.find(p => p.id === id);
            if (product && cart[idStr] > 0) {
                const quantity = cart[idStr];
                const itemTotalUSD = product.priceUSD * quantity;
                totalUSD += itemTotalUSD;

                itemsHTML += `
                    <div class="cart-item">
                        <span>${quantity}x ${product.name}</span>
                        <span class="cart-price">$${itemTotalUSD.toFixed(2)}</span>
                    </div>
                `;
            }
        });
    }

    const totalBS = totalUSD * currentRate;

    itemsContainer.innerHTML = itemsHTML;
    totalUSDElement.textContent = `$${totalUSD.toFixed(2)}`;
    totalBSElement.textContent = `Bs. ${totalBS.toFixed(2)}`;
}

window.openCartModal = function() {
    renderCart();
    openModal('cartModal');
}

// --- RENDERIZADO DE PRODUCTOS ---
window.renderProducts = function(filter = '') {
    const container = document.getElementById('productList');
    const empty = document.getElementById('emptyState');
    container.innerHTML = '';
    
    const term = filter.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.code && p.code.toLowerCase().includes(term))
    );

    if (filtered.length === 0) {
        empty.style.display = 'block'; return;
    }
    empty.style.display = 'none';

    filtered.forEach(p => {
        // Se asegura que la tasa exista antes de calcular.
        const priceBs = (p.priceUSD * currentRate).toFixed(2);
        const img = p.image || 'https://via.placeholder.com/150?text=IMG';
        
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img src="${img}" class="card-img">
                    <button class="delete-btn" onclick="deleteProduct(${p.id})">&times;</button>
                </div>
                <div class="card-content">
                    <div class="card-title">${p.name}</div>
                    ${p.code ? `<div class="card-code">${p.code}</div>` : ''}
                    
                    <div class="price-box">
                        <div class="price-usd">$${p.priceUSD.toFixed(2)}</div>
                        <div class="price-bs">Bs. ${priceBs}</div>
                    </div>
                    <button class="btn-add-to-cart" onclick="addToCart(${p.id})">🛒 Añadir</button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// --- MANEJO DE IMÁGENES ---
window.handleImage = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 400; 
                const scale = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH; 
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                
                document.getElementById('previewImg').src = dataUrl;
                document.getElementById('previewImg').style.display = 'block';
                document.getElementById('prodImgBase64').value = dataUrl;
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// --- ESCÁNER Y MODALES ---

/**
 * Inicia la cámara para escanear.
 * @param {string} mode 'search' para el buscador, 'input' para el código de producto.
 */
window.startScanner = function(mode) {
    scanMode = mode;
    openModal('scannerModal');
    document.getElementById('httpsError').style.display = 'none'; 

    if(isScanning) return;

    // Advertencia de protocolo (el escáner requiere HTTPS o localhost)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        document.getElementById('httpsError').style.display = 'block';
        return;
    }
    
    // Título del modal de escáner
    document.getElementById('scanTitle').textContent = scanMode === 'search' ? 'Escaneando para Buscar...' : 'Escaneando Código de Barras...';

    html5QrcodeScanner = new Html5Qrcode("reader");
    const config = { 
        fps: 20, 
        qrbox: { width: 250, height: 200 }, 
        aspectRatio: 1.0
    };
    
    html5QrcodeScanner.start(
        { facingMode: "environment" },
        config, 
        onScanSuccess
    )
    .catch(err => {
        console.error("Error al iniciar la cámara para el escáner:", err);
        // Si falla la promesa, es probablemente un error de permisos/cámara
        document.getElementById('httpsError').style.display = 'block';
    });
    isScanning = true;
}

window.stopScanner = function() {
    if (html5QrcodeScanner && isScanning) {
        html5QrcodeScanner.stop().then(() => {
            html5QrcodeScanner.clear();
            isScanning = false;
        }).catch(err => console.error("Error al detener el escáner:", err));
    }
}

function onScanSuccess(decodedText) {
    if (navigator.vibrate) navigator.vibrate(200); // Vibración al escanear con éxito
    closeModal('scannerModal');
    stopScanner();
    
    if (scanMode === 'search') {
        document.getElementById('searchInput').value = decodedText;
        renderProducts(decodedText);
    } else { // scanMode === 'input'
        const existe = products.some(p => p.code === decodedText);
        if (existe) {
            alert("⚠️ Producto ya existe. No se puede usar el código.");
        } else {
            document.getElementById('prodCode').value = decodedText;
        }
    }
}

window.openModal = function(id) { 
    document.getElementById(id).classList.add('active'); 
}
window.closeModal = function(id) { 
    document.getElementById(id).classList.remove('active'); 
}
