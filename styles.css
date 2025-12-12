/* ================= ESTILOS (CSS) ================= */
:root {
    --primary: #FF6F00;
    --primary-dark: #E65100;
    --bg-body: #F3F4F6;
    --white: #FFFFFF;
    --text: #1F2937;
    --radius: 12px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-tap-highlight-color: transparent; }

body { background-color: var(--bg-body); color: var(--text); padding-bottom: 90px; }

/* HEADER & TASA */
header {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    padding: 1.5rem 1rem 3.5rem 1rem;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    box-shadow: var(--shadow);
    position: relative;
}

.header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
h1 { font-size: 1.4rem; font-weight: 800; }

/* CONTROL DE TASA DE CAMBIO */
.rate-control {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    backdrop-filter: blur(5px);
}
.rate-control label { font-size: 0.9rem; font-weight: 600; }
.rate-control input {
    width: 80px;
    border: none;
    border-radius: 6px;
    padding: 5px;
    text-align: center;
    font-weight: bold;
    color: var(--primary-dark);
}

/* BUSCADOR FLOTANTE */
.search-container {
    margin: -30px auto 20px auto;
    width: 90%;
    max-width: 600px;
    background: var(--white);
    border-radius: 16px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
}
.search-container input {
    flex: 1; border: none; outline: none; font-size: 1rem; padding: 8px;
}
.btn-scan-mini {
    background: #FFF3E0; color: var(--primary); border: none; width: 40px; height: 40px;
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.2rem;
}

/* LISTA DE PRODUCTOS */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    padding: 0 16px;
    max-width: 1000px;
    margin: 0 auto;
}
.card {
    background: var(--white); border-radius: var(--radius); overflow: hidden;
    box-shadow: var(--shadow); display: flex; flex-direction: column;
    position: relative; transition: transform 0.1s;
}

.card-img-container {
    width: 100%; height: 140px; background: #eee; position: relative;
}
.card-img { width: 100%; height: 100%; object-fit: cover; }

.delete-btn {
    position: absolute; top: 8px; right: 8px;
    background: rgba(255,255,255,0.95); color: #EF4444;
    width: 30px; height: 30px; border-radius: 50%; border: none;
    font-weight: bold; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2); cursor: pointer;
}

.card-content { padding: 12px; flex: 1; display: flex; flex-direction: column; }
.card-title { font-weight: 700; font-size: 1rem; margin-bottom: 4px; color: var(--text); line-height: 1.2; }
.card-code { font-size: 0.75rem; color: #6B7280; background: #F3F4F6; padding: 2px 6px; border-radius: 4px; align-self: flex-start; margin-bottom: 8px; }

/* PRECIOS DUALES Y BOTÓN AÑADIR */
.price-box { margin-top: auto; margin-bottom: 8px; }
.price-usd { font-size: 1.2rem; font-weight: 800; color: var(--text); }
.price-bs { font-size: 0.95rem; font-weight: 600; color: var(--primary); }
.btn-add-to-cart {
    background: #E5E7EB; color: var(--text); border: none; padding: 8px;
    width: 100%; border-radius: 8px; font-weight: 600; cursor: pointer;
}


/* FABs y MODALES */
.fab {
    position: fixed; bottom: 20px; right: 20px; width: 64px; height: 64px;
    background: var(--primary); color: var(--white); border-radius: 50%; border: none;
    box-shadow: 0 10px 25px rgba(255, 111, 0, 0.4); font-size: 2rem; cursor: pointer; z-index: 100;
}
.fab-cart {
    bottom: 90px;
    font-size: 1.5rem;
    width: 54px; height: 54px;
    background: #1F2937;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
.modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8); z-index: 200; display: none; align-items: center; justify-content: center; backdrop-filter: blur(3px);
}
.modal-overlay.active { display: flex; }
.modal-card {
    background: var(--white); width: 90%; max-width: 450px; border-radius: 20px; padding: 24px;
    max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s ease;
}
@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.form-group { margin-bottom: 16px; }
.form-label { display: block; font-weight: 600; margin-bottom: 6px; }
.form-input { width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 12px; font-size: 1rem; }
.btn-primary { background: var(--primary); color: white; border: none; padding: 14px; width: 100%; border-radius: 12px; font-weight: 700; margin-top: 10px; }
.input-row { display: flex; gap: 8px; }
.btn-secondary { background: #E5E7EB; border: none; padding: 0 15px; border-radius: 10px; cursor: pointer; }

/* ESTILOS DEL CARRITO */
.cart-item {
    display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;
    font-size: 0.95rem;
}
.cart-item:last-child { border-bottom: none; }
.cart-price { font-weight: 600; color: var(--text); }

.cart-summary {
    margin-top: 20px; padding-top: 15px; border-top: 2px solid #F3F4F6;
}
.cart-total-row {
    display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;
    font-size: 1.1rem;
}
.total-bs-final { color: var(--primary-dark); font-size: 1.3rem; }

/* ERROR MESSAGE */
.scanner-error-msg {
    background: #FEE2E2; color: #B91C1C; padding: 10px; border-radius: 8px;
    font-size: 0.85rem; margin-bottom: 10px; display: none; text-align: center;
}
