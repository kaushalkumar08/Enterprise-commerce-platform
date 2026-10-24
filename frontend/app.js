const API_URL = 'https://enterprise-commerce-platform.onrender.com';
let token = localStorage.getItem('token') || '';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let isRegisterMode = false;

document.addEventListener('DOMContentLoaded', () => {
  syncAuthState();
  fetchCatalog();
  if (currentUser && currentUser.role === 'admin') fetchAnalytics();
});

function syncAuthState() {
  const profileBadge = document.getElementById('userProfileBadge');
  const authBtn = document.getElementById('authTriggerBtn');
  const analyticsSection = document.getElementById('adminAnalyticsSection');

  if (currentUser) {
    profileBadge.style.display = 'inline-block';
    profileBadge.textContent = `${currentUser.name} (${currentUser.role.toUpperCase()})`;
    authBtn.textContent = 'Logout';
    authBtn.onclick = executeLogout;

    if (currentUser.role === 'admin') {
      analyticsSection.style.display = 'block';
    } else {
      analyticsSection.style.display = 'none';
    }
  } else {
    profileBadge.style.display = 'none';
    authBtn.textContent = 'Login / Register';
    authBtn.onclick = toggleAuthModal;
    analyticsSection.style.display = 'none';
  }
}

async function fetchCatalog() {
  const search = document.getElementById('searchInput').value;
  const category = document.getElementById('categoryFilter').value;

  const res = await fetch(`${API_URL}/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);
  const data = await res.json();

  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = '';

  if (data.products) {
    data.products.forEach(product => {
      grid.innerHTML += `
        <div class="card">
          <img src="${product.imageUrl}" alt="${product.title}">
          <div class="card-body">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="price-tag">$${product.price.toFixed(2)}</div>
            ${currentUser && currentUser.role === 'customer' ? 
              `<button style="width:100%;" onclick="triggerCheckout('${product._id}')">Purchase Item</button>` : ''}
          </div>
        </div>
      `;
    });
  }
}

async function fetchAnalytics() {
  if (!token) return;
  const res = await fetch(`${API_URL}/analytics/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();

  if (data.success) {
    const { totalUsers, totalProducts, totalOrders, totalRevenue } = data.analytics;
    document.getElementById('metricRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('metricOrders').textContent = totalOrders;
    document.getElementById('metricProducts').textContent = totalProducts;
    document.getElementById('metricUsers').textContent = totalUsers;
  }
}

async function triggerCheckout(productId) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ items: [{ productId, quantity: 1 }] })
  });

  const data = await res.json();
  if (data.success) {
    alert('Order placed successfully!');
    fetchCatalog();
  } else {
    alert(data.error);
  }
}

function toggleAuthModal() {
  const modal = document.getElementById('authModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function toggleAuthMode() {
  isRegisterMode = !isRegisterMode;
  document.getElementById('modalHeader').textContent = isRegisterMode ? 'Register Account' : 'Access Portal';
  document.getElementById('authName').style.display = isRegisterMode ? 'block' : 'none';
  document.getElementById('authRole').style.display = isRegisterMode ? 'block' : 'none';
  document.getElementById('authSubmitBtn').textContent = isRegisterMode ? 'Register' : 'Login';
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const endpoint = isRegisterMode ? '/auth/register' : '/auth/login';
  const payload = {
    email: document.getElementById('authEmail').value,
    password: document.getElementById('authPassword').value
  };

  if (isRegisterMode) {
    payload.name = document.getElementById('authName').value;
    payload.role = document.getElementById('authRole').value;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.success) {
    token = data.token;
    currentUser = data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(currentUser));
    syncAuthState();
    toggleAuthModal();
    fetchCatalog();
    if (currentUser.role === 'admin') fetchAnalytics();
  } else {
    alert(data.error);
  }
}

function executeLogout() {
  localStorage.clear();
  token = '';
  currentUser = null;
  syncAuthState();
  fetchCatalog();
}