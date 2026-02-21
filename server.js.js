const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. UPDATED PRODUCT DATABASE
const products = [
    { id: 1, name: "Lay's Classic Salted", category: "chips", price: 20, weight: "50g", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200" },
    { id: 2, name: "Oreo Cocoa Biscuits", category: "biscuits", price: 40, weight: "120g", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200" },
    { id: 3, name: "Coca Cola Classic", category: "drinks", price: 45, weight: "250ml", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200" },
    { id: 4, name: "Cadbury Dairy Milk", category: "chocolate", price: 20, weight: "25g", image: "https://images.unsplash.com/photo-1548900912-38100417acc9?w=200" },
    { id: 5, name: "Kurkure Masala Munch", category: "chips", price: 20, weight: "90g", image: "https://images.unsplash.com/photo-1601050638911-c32402944be8?w=200" },
    { id: 6, name: "Maggi Masala Noodles", category: "instant", price: 14, weight: "70g", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200" },
    { id: 7, name: "Red Bull Energy", category: "drinks", price: 125, weight: "250ml", image: "https://images.unsplash.com/photo-1622483075986-9034298165f9?w=200" },
    { id: 8, name: "Amul Butter", category: "dairy", price: 56, weight: "100g", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200" }
];

app.get('/api/products', (req, res) => res.json(products));

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zepto Clone | 10 Min Delivery</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        :root { 
            --primary: #3b006a; 
            --accent: #ff3269; 
            --text-main: #1f2937;
            --text-light: #6b7280;
            --bg: #f8fafc;
        }

        body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            background: var(--bg); 
            color: var(--text-main);
            padding-bottom: 110px; 
        }

        /* Modern Sticky Header */
        header { 
            background: white; 
            padding: 12px 16px; 
            position: sticky; 
            top: 0; 
            z-index: 100; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
        }

        .delivery-pill {
            display: inline-flex;
            align-items: center;
            background: var(--primary);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .search-container {
            position: relative;
        }

        .search-bar { 
            width: 100%; 
            padding: 14px 14px 14px 40px; 
            border: 1px solid #e5e7eb; 
            border-radius: 12px; 
            box-sizing: border-box; 
            background: #f1f5f9; 
            font-size: 14px;
            outline: none;
            transition: 0.2s;
        }

        .search-bar:focus {
            background: white;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(59, 0, 106, 0.1);
        }

        /* Horizontal Category List */
        .filters { 
            display: flex; 
            overflow-x: auto; 
            padding: 12px 16px; 
            gap: 10px; 
            background: white;
            border-bottom: 1px solid #f1f5f9;
        }

        .filters::-webkit-scrollbar { display: none; }

        .filter-btn { 
            padding: 8px 18px; 
            border-radius: 25px; 
            border: 1px solid #e5e7eb; 
            background: white; 
            font-size: 13px; 
            font-weight: 600;
            cursor: pointer; 
            white-space: nowrap;
            transition: 0.2s;
        }

        .filter-btn.active { 
            background: var(--primary); 
            color: white; 
            border-color: var(--primary); 
        }

        /* Professional Product Grid */
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
            gap: 16px; 
            padding: 16px; 
        }

        .card { 
            background: white; 
            padding: 12px; 
            border-radius: 16px; 
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }

        .card:active { transform: scale(0.97); }

        .card img { 
            width: 100%; 
            height: 130px; 
            object-fit: contain; 
            margin-bottom: 12px; 
        }

        .price-tag { font-weight: 700; font-size: 17px; margin: 0; color: var(--text-main); }
        .product-name { font-size: 14px; font-weight: 500; color: #374151; margin: 4px 0; line-height: 1.4; height: 40px; overflow: hidden; }
        .product-weight { font-size: 12px; color: var(--text-light); margin-bottom: 12px; }

        .add-btn { 
            width: 100%; 
            padding: 10px; 
            border: 1px solid var(--accent); 
            color: var(--accent); 
            background: white; 
            border-radius: 8px; 
            font-weight: 700; 
            cursor: pointer; 
            text-transform: uppercase;
            font-size: 12px;
            transition: 0.2s;
        }

        .add-btn:hover { background: var(--accent); color: white; }

        /* Floating Cart Bar */
        .cart-bar { 
            position: fixed; 
            bottom: 20px; 
            left: 16px; 
            right: 16px; 
            background: var(--primary); 
            color: white; 
            padding: 16px 20px; 
            border-radius: 16px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            box-shadow: 0 10px 15px -3px rgba(59, 0, 106, 0.3);
            cursor: pointer;
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

        /* Tracking UI */
        .track-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: flex-end; }
        .track-card { background: white; width: 100%; border-radius: 32px 32px 0 0; padding: 30px 24px; text-align: center; }
        
        .timer-display { font-size: 32px; font-weight: 800; color: var(--accent); margin-bottom: 8px; }
        .status-msg { font-size: 14px; color: var(--text-light); margin-bottom: 24px; font-weight: 500; }

        .map { height: 6px; background: #e2e8f0; position: relative; margin: 30px 0; border-radius: 10px; }
        .bike { position: absolute; top: -30px; left: 0; font-size: 32px; transition: left 1s linear; }
        
        .close-btn { 
            padding: 14px; width: 100%; border: none; background: #f1f5f9; 
            border-radius: 12px; font-weight: 700; color: var(--text-main); cursor: pointer;
        }

        .hidden { display: none !important; }
    </style>
</head>
<body>
    <header>
        <div class="delivery-pill">10 Minutes ⚡</div>
        <div class="search-container">
            <input type="text" class="search-bar" id="search" placeholder="Search for snacks, dairy and more..." oninput="filterProducts()">
        </div>
    </header>

    <div class="filters">
        <button class="filter-btn active" onclick="setCategory('all', this)">All Items</button>
        <button class="filter-btn" onclick="setCategory('chips', this)">Munchies</button>
        <button class="filter-btn" onclick="setCategory('drinks', this)">Cool Drinks</button>
        <button class="filter-btn" onclick="setCategory('dairy', this)">Dairy & Eggs</button>
        <button class="filter-btn" onclick="setCategory('chocolate', this)">Sweet Tooth</button>
    </div>

    <div id="products" class="grid"></div>
    
    <div id="cartBar" class="cart-bar hidden" onclick="placeOrder()">
        <div style="display:flex; flex-direction:column">
            <span id="cartCount" style="font-size:14px; font-weight:700">0 Items</span>
            <span style="font-size:11px; opacity:0.8">Checkout and Pay</span>
        </div>
        <span style="font-weight:700; font-size:14px">Place Order →</span>
    </div>

    <div id="trackScreen" class="track-overlay hidden">
        <div class="track-card">
            <div class="timer-display" id="time">10:00</div>
            <div class="status-msg" id="status">Rider is being assigned...</div>
            <div class="map">
                <div id="bike" class="bike">🛵</div>
                <div style="position:absolute; right:0; top:-30px; font-size:32px;">🏠</div>
            </div>
            <button onclick="document.getElementById('trackScreen').classList.add('hidden')" class="close-btn">Return to Shop</button>
        </div>
    </div>

    <script>
        let allProducts = [];
        let currentCategory = 'all';
        let cartCount = 0;

        async function load() {
            const res = await fetch('/api/products');
            allProducts = await res.json();
            render();
        }

        function setCategory(cat, btn) {
            currentCategory = cat;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render();
        }

        function filterProducts() { render(); }

        function render() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const filtered = allProducts.filter(p => {
                const matchesCat = currentCategory === 'all' || p.category === currentCategory;
                const matchesSearch = p.name.toLowerCase().includes(searchTerm);
                return matchesCat && matchesSearch;
            });

            document.getElementById('products').innerHTML = filtered.map(p => \`
                <div class="card">
                    <img src="\${p.image}">
                    <p class="price-tag">₹\${p.price}</p>
                    <p class="product-name">\${p.name}</p>
                    <p class="product-weight">\${p.weight}</p>
                    <button class="add-btn" onclick="add()">ADD</button>
                </div>
            \`).join('');
        }

        function add() {
            cartCount++;
            document.getElementById('cartBar').classList.remove('hidden');
            document.getElementById('cartCount').innerText = cartCount + (cartCount === 1 ? " Item" : " Items");
        }

        function placeOrder() {
            document.getElementById('trackScreen').classList.remove('hidden');
            let timer = 600;
            const interval = setInterval(() => {
                timer--;
                let m = Math.floor(timer/60), s = timer%60;
                document.getElementById('time').innerText = m + ":" + (s<10?'0':'')+s;
                document.getElementById('bike').style.left = ((600-timer)/600)*92 + "%";
                
                if(timer == 580) document.getElementById('status').innerText = "Rider picked up your order!";
                if(timer == 300) document.getElementById('status').innerText = "Rider is halfway to your home!";
                if(timer <= 0) {
                    clearInterval(interval);
                    document.getElementById('status').innerText = "Your snacks have arrived! 🍿";
                }
            }, 1000);
        }
        load();
    </script>
</body>
</html>
    `);
});

app.listen(PORT, () => console.log(`SUCCESS! Open http://localhost:\${PORT}`));