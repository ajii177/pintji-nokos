const services = [
  {name:"WhatsApp",country:"Indonesia",flag:"🇮🇩",icon:"◉",price:3500},
  {name:"Telegram",country:"Indonesia",flag:"🇮🇩",icon:"➤",price:2800},
  {name:"WhatsApp",country:"Malaysia",flag:"🇲🇾",icon:"◉",price:4200},
  {name:"Telegram",country:"Amerika Serikat",flag:"🇺🇸",icon:"➤",price:5000},
  {name:"Verifikasi SMS",country:"Britania Raya",flag:"🇬🇧",icon:"✉",price:6200},
  {name:"Verifikasi SMS",country:"Malaysia",flag:"🇲🇾",icon:"✉",price:3900}
];
const catalog = document.querySelector("#catalog");
const searchInput = document.querySelector("#searchInput");
const countryFilter = document.querySelector("#countryFilter");
const dialog = document.querySelector("#orderDialog");
const toast = document.querySelector("#toast");
let selected = null;
function rupiah(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n)}
function render(){
 const q=searchInput.value.trim().toLowerCase(), country=countryFilter.value;
 const filtered=services.filter(s=>(s.name.toLowerCase().includes(q)||s.country.toLowerCase().includes(q))&&(country==="all"||s.country===country));
 catalog.innerHTML=filtered.length?filtered.map((s,i)=>`<article class="service-card"><div class="service-top"><div class="service-icon">${s.icon}</div><span class="available">● Demo tersedia</span></div><h3>${s.name}</h3><div class="country">${s.flag} &nbsp;${s.country}</div><div class="card-bottom"><div class="price"><small>Harga contoh mulai</small><b>${rupiah(s.price)}</b></div><button class="order-btn" data-index="${services.indexOf(s)}">Pilih layanan ↗</button></div></article>`).join(""):`<div class="empty">Layanan tidak ditemukan. Coba kata kunci lain.</div>`;
 catalog.querySelectorAll(".order-btn").forEach(btn=>btn.addEventListener("click",()=>openOrder(services[Number(btn.dataset.index)])));
}
function openOrder(s){selected=s;document.querySelector("#dialogTitle").textContent=s.name;document.querySelector("#dialogDesc").textContent="Kamu akan melihat simulasi pesanan. Belum ada nomor atau transaksi sungguhan.";document.querySelector("#dialogCountry").textContent=`${s.flag} ${s.country}`;document.querySelector("#dialogPrice").textContent=rupiah(s.price);dialog.showModal()}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
searchInput.addEventListener("input",render);countryFilter.addEventListener("change",render);
document.querySelector("#closeDialog").addEventListener("click",()=>dialog.close());
document.querySelector("#confirmOrder").addEventListener("click",()=>{dialog.close();showToast("Simulasi berhasil — integrasi pesanan belum aktif.")});
document.querySelector("#loginBtn").addEventListener("click",()=>showToast("Login akan diaktifkan setelah backend dipasang."));
document.querySelector("#ctaBtn").addEventListener("click",()=>document.querySelector("#layanan").scrollIntoView({behavior:"smooth"}));
document.querySelector("#menuButton").addEventListener("click",()=>document.querySelector("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#nav").classList.remove("open")));
document.querySelector("#year").textContent=new Date().getFullYear();
render();