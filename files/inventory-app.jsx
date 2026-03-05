import { useState, useMemo, useEffect } from "react";
import logo from "./assets/newlogo.png";

const initialInventory = {
  "Branded Merchandise": [
    { id: 1, name: "Keychains", qty: 125 },
    { id: 2, name: "Blue Tote Bag (Standard)", qty: 150 },
    { id: 3, name: "Branded Tape", qty: 5 },
    { id: 4, name: "Pens", qty: 100 },
    { id: 5, name: "Tape Measures", qty: 3050 },
    { id: 6, name: "Canvas White Tote Bag", qty: 2 },
    { id: 7, name: "Hats", qty: 12 },
    { id: 8, name: "Bottle", qty: 7 },
    { id: 9, name: "Blue Tote Bag (Dvx)", qty: 50 },
    { id: 10, name: "Luggage Tags", qty: 50 },
    { id: 11, name: "Speakers", qty: 0 },
    { id: 12, name: "Circular Stickers for Sealing", qty: 2 },
    { id: 13, name: "Die-Cut Leg Sticker", qty: 0 },
    { id: 14, name: "Packing Tape", qty: 0 },
    { id: 15, name: "Body Tape Measure", qty: 0 },
  ],
  "Printable Materials": [
    { id: 20, name: "Quad Fold Brochures - English", qty: 1100 },
    { id: 21, name: "Quad Fold Brochures - Spanish", qty: 900 },
    { id: 22, name: "Patient Journey Packets - English", qty: 600 },
    { id: 23, name: "Patient Journey Packets - Spanish", qty: 750 },
    { id: 24, name: "Phlebolymphedema - LTA Sheet", qty: 1100 },
    { id: 25, name: "Clinical Resource Guide (Binder)", qty: 10 },
    { id: 26, name: "Tri-Fold Arm Brochure - English", qty: 1500 },
    { id: 27, name: "Tri-Fold Arm Brochure - Spanish", qty: 1400 },
    { id: 28, name: "Compression Therapy - Poster 24x18", qty: 0 },
    { id: 29, name: "Great Vein - Poster 24x18", qty: 0 },
    { id: 30, name: "LTA/Clinician Sign Up Sheet", qty: 0 },
    { id: 31, name: "Lower Extremity Compression Order Form (Rx Pad)", qty: 0 },
    { id: 32, name: "Upper Extremity Compression Order Form (Rx Pad)", qty: 0 },
    { id: 33, name: "Clinical Measurement Guide (Rx Pad)", qty: 0 },
    { id: 34, name: "Gramatan Envelopes", qty: 0 },
    { id: 35, name: "Quickstart Guide Insert - Flex", qty: 0 },
    { id: 36, name: "Quickstart Guide Insert - Standard", qty: 0 },
    { id: 37, name: "Quickstart Guide Sizing Guide - Flex", qty: 0 },
    { id: 38, name: "Quickstart Guide Sizing Guide - Standard", qty: 0 },
    { id: 39, name: "Clinician Demo Kit Insert", qty: 0 },
  ],
  "Apparel — Men": [
    { id: 40, name: "Scrubs Top (S)", qty: 0 },
    { id: 41, name: "Scrubs Top (M)", qty: 5 },
    { id: 42, name: "Scrubs Top (L)", qty: 1 },
    { id: 43, name: "Scrubs Pants (XS)", qty: 3 },
    { id: 44, name: "Scrubs Pants (S)", qty: 4 },
    { id: 45, name: "Scrubs Pants (M)", qty: 4 },
    { id: 46, name: "Scrubs Pants (L)", qty: 3 },
    { id: 47, name: "Scrubs Pants (XL)", qty: 4 },
    { id: 48, name: "Vest (S)", qty: 0 },
    { id: 49, name: "Vest (M)", qty: 0 },
    { id: 50, name: "Vest (L)", qty: 0 },
    { id: 51, name: "Polos (S)", qty: 0 },
    { id: 52, name: "Polos (M)", qty: 0 },
    { id: 53, name: "Polos (L)", qty: 0 },
    { id: 54, name: "1/4 zip (S)", qty: 0 },
    { id: 55, name: "1/4 zip (M)", qty: 0 },
    { id: 56, name: "1/4 zip (L)", qty: 0 },
  ],
  "Apparel — Women": [
    { id: 60, name: "Scrubs Top (XS)", qty: 2 },
    { id: 61, name: "Scrubs Top (S)", qty: 0 },
    { id: 62, name: "Scrubs Top (M)", qty: 8 },
    { id: 63, name: "Scrubs Top (L)", qty: 0 },
    { id: 64, name: "Scrubs Top (XL)", qty: 7 },
    { id: 65, name: "Scrubs Pants (M)", qty: 7 },
    { id: 66, name: "Scrubs Pants (S)", qty: 0 },
    { id: 67, name: "Black tee (XS)", qty: 2 },
    { id: 68, name: "Black tee (S)", qty: 3 },
    { id: 69, name: "Black tee (M)", qty: 5 },
    { id: 70, name: "Black tee (L)", qty: 2 },
    { id: 71, name: "Vest (S)", qty: 0 },
    { id: 72, name: "Vest (M)", qty: 0 },
    { id: 73, name: "Vest (L)", qty: 0 },
    { id: 74, name: "Polos (S)", qty: 0 },
    { id: 75, name: "Polos (M)", qty: 0 },
    { id: 76, name: "Polos (L)", qty: 0 },
    { id: 77, name: "1/4 zip (S)", qty: 0 },
    { id: 78, name: "1/4 zip (M)", qty: 0 },
    { id: 79, name: "1/4 zip (L)", qty: 0 },
  ],
};

const CATEGORY_ICONS = {
  "Branded Merchandise": "",
  "Printable Materials": "",
  "Apparel — Men": "",
  "Apparel — Women": "",
};

const CATEGORY_COLORS = {
  "Branded Merchandise": { bg: "#ffffff", accent: "#f6ac40", light: "#002639" },
  "Printable Materials": { bg: "#ffffff", accent: "#002639", light: "#002639" },
  "Apparel — Men": { bg: "#ffffff", accent: "#54bfcf", light: "#002639" },
  "Apparel — Women": { bg: "#ffffff", accent: "#002639", light: "#002639" },
};

// ─────────────────────────────────────────────────────────────
// 👥 USERS LIST
// ─────────────────────────────────────────────────────────────
const USERS = [
  { username: "admin", password: "Aerowrap@145" },
  { username: "sanat", password: "Aerowrap@123" },
];

const CONFIG_VERSION = "1.2";

// ─────────────────────────────────────────────────────────────
// 👕 APPAREL CARD COMPONENT
// ─────────────────────────────────────────────────────────────
const ApparelCard = ({ baseName, variants, category, openDeduct, colors }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure we don't crash if variants changed (e.g. during search)
  useEffect(() => {
    if (selectedIndex >= variants.length) setSelectedIndex(0);
  }, [variants, selectedIndex]);

  const selectedItem = variants[selectedIndex] || variants[0];
  if (!selectedItem) return null;

  const isLow = selectedItem.qty > 0 && selectedItem.qty < 20;
  const isOut = selectedItem.qty === 0;

  return (
    <div
      className="item-card"
      style={{
        background: "#ffffff",
        border: `2px solid ${isOut || isLow ? "#ff4d4d" : "#54bfcf"}`,
        borderRadius: 12,
        padding: "18px 20px",
        cursor: "pointer",
        boxShadow: isOut || isLow ? "0 0 10px rgba(255, 77, 77, 0.2)" : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      onClick={() => openDeduct(selectedItem, category)}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#002639", lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{baseName}</div>
          {isOut && <span style={{ background: "#ffffff", border: "1px solid #ff4d4d", color: "#ff4d4d", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>OUT</span>}
          {isLow && <span style={{ background: "#ffffff", border: "1px solid #ff4d4d", color: "#ff4d4d", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>LOW</span>}
        </div>

        {variants.length > 0 && (variants.length > 1 || variants[0].size) && (
          <div onClick={e => e.stopPropagation()}>
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: 8,
                border: "1.5px solid #54bfcf",
                fontSize: 12,
                outline: "none",
                background: "#f8f9fa",
                color: "#002639",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              {variants.map((v, idx) => (
                <option key={v.id} value={idx}>
                  {v.size ? `Size: ${v.size}` : "Default Size"} — {v.qty} in stock
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ marginTop: 14, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div className="qty-badge" style={{ color: isOut || isLow ? "#ff4d4d" : "#002639" }}>
            {selectedItem.qty.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#54bfcf", fontWeight: 600 }}>units</div>
        </div>
        <div style={{ background: "#ffffff", border: `1px solid ${colors.accent}`, color: colors.accent, borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600 }}>
          Manage
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("sunInventory");
    const savedVersion = localStorage.getItem("sunInventoryVersion");

    if (saved && savedVersion === CONFIG_VERSION) {
      try {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse saved inventory", e);
      }
    }
    return initialInventory;
  });

  const [nextIdState, setNextIdState] = useState(() => {
    const saved = localStorage.getItem("sunInventoryNextId");
    const savedVersion = localStorage.getItem("sunInventoryVersion");
    if (saved && savedVersion === CONFIG_VERSION) return parseInt(saved, 10);
    return 200;
  });

  // Update version in localStorage after state is initialized
  useEffect(() => {
    localStorage.setItem("sunInventoryVersion", CONFIG_VERSION);
  }, []);

  const [pendingOrders, setPendingOrders] = useState(() => {
    const saved = localStorage.getItem("sunPendingOrders");
    const savedVersion = localStorage.getItem("sunInventoryVersion");
    if (saved && savedVersion === CONFIG_VERSION) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState("Inventory"); // "Inventory" or "Pending"
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [deductModal, setDeductModal] = useState(null); // {item, category}
  const [addModal, setAddModal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(null); // category name
  const [orderModal, setOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ itemName: "", qty: 0, date: new Date().toISOString().split('T')[0] });
  const [deductQty, setDeductQty] = useState(1);
  const [addStockQty, setAddStockQty] = useState(0);
  const [newItem, setNewItem] = useState({ name: "", qty: 0, category: "" });
  const [newCategory, setNewCategory] = useState("");
  const [editingItem, setEditingItem] = useState(null); // {item, category}
  const [editingCategory, setEditingCategory] = useState(null); // category name
  const [toast, setToast] = useState(null);
  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("sunInventoryLog");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });
  const [showLog, setShowLog] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("sunAuthUser"));
  const [loginForm, setLoginForm] = useState({ username: "", password: "", error: "" });

  // Low Stock Tab Title Alert
  useEffect(() => {
    const lowItems = Object.values(inventory).flat().filter(i => i.qty < 20);
    if (lowItems.length > 0) {
      document.title = `(⚠️ ${lowItems.length}) Sun Inventory`;
    } else {
      document.title = "Sun Inventory";
    }
  }, [inventory]);

  const handleLogin = () => {
    const match = USERS.find(
      u => u.username === loginForm.username.trim() && u.password === loginForm.password
    );
    if (match) {
      localStorage.setItem("sunAuthUser", match.username);
      setLoggedIn(true);
      setLoginForm({ username: "", password: "", error: "" });
    } else {
      setLoginForm(p => ({ ...p, error: "Invalid username or password." }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sunAuthUser");
    setLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("sunInventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("sunPendingOrders", JSON.stringify(pendingOrders));
  }, [pendingOrders]);

  useEffect(() => {
    localStorage.setItem("sunInventoryNextId", nextIdState.toString());
  }, [nextIdState]);

  useEffect(() => {
    localStorage.setItem("sunInventoryLog", JSON.stringify(log));
  }, [log]);

  const categories = ["All", ...Object.keys(inventory)];

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const addToLog = (entry) => {
    setLog(prev => [{ ...entry, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 49)]);
  };

  const filteredItems = useMemo(() => {
    const results = [];
    for (const [cat, items] of Object.entries(inventory)) {
      if (activeCategory !== "All" && activeCategory !== cat) continue;
      for (const item of items) {
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) continue;
        results.push({ ...item, category: cat });
      }
    }
    return results;
  }, [inventory, activeCategory, search]);

  const totalItems = Object.values(inventory).flat().length;
  const lowStockCount = Object.values(inventory).flat().filter(i => i.qty < 20).length;
  const totalUnits = Object.values(inventory).flat().reduce((s, i) => s + i.qty, 0);

  const handleDeduct = () => {
    const qty = parseInt(deductQty);
    if (!qty || qty < 1) return;
    const { item, category } = deductModal;
    if (qty > item.qty) { showToast("Not enough stock!", "error"); return; }
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(i => i.id === item.id ? { ...i, qty: i.qty - qty } : i)
    }));
    addToLog({ type: "deduct", item: item.name, qty, category });
    showToast(`Deducted ${qty} × ${item.name}`);
    setDeductModal(null);
    setDeductQty(1);
  };

  const handleAddStock = () => {
    const qty = parseInt(addStockQty);
    if (!qty || qty < 1) return;
    const { item, category } = deductModal;
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i)
    }));
    addToLog({ type: "restock", item: item.name, qty, category });
    showToast(`Added ${qty} units to ${item.name}`, "info");
    setDeductModal(null);
    setAddStockQty(0);
  };

  const handleAddItem = () => {
    const cat = addItemModal || newItem.category;
    if (!newItem.name.trim() || !cat) return;
    const item = { id: nextIdState, name: newItem.name.trim(), qty: parseInt(newItem.qty) || 0 };
    setNextIdState(prev => prev + 1);
    if (inventory[cat]) {
      setInventory(prev => ({ ...prev, [cat]: [...prev[cat], item] }));
    } else {
      setInventory(prev => ({ ...prev, [cat]: [item] }));
    }
    addToLog({ type: "added", item: item.name, qty: item.qty, category: cat });
    showToast(`Added "${item.name}" to ${cat}`);
    setNewItem({ name: "", qty: 0, category: "" });
    setAddItemModal(null);
    setAddModal(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim() || inventory[newCategory.trim()]) return;
    setInventory(prev => ({ ...prev, [newCategory.trim()]: [] }));
    showToast(`Category "${newCategory.trim()}" created!`);
    setNewCategory("");
  };

  const handleDeleteItem = () => {
    if (!deductModal) return;
    const { item, category } = deductModal;
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    setInventory(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i.id !== item.id)
    }));
    addToLog({ type: "delete", item: item.name, category });
    showToast(`Deleted ${item.name}`, "error");
    setDeductModal(null);
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    const { item, category, newName, newQty } = editingItem;
    if (!newName.trim()) return;

    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(i => i.id === item.id ? { ...i, name: newName.trim(), qty: parseInt(newQty) || 0 } : i)
    }));
    showToast(`Updated ${newName}`);
    setEditingItem(null);
    setDeductModal(null);
  };

  const handleDeleteCategory = (cat) => {
    if (!window.confirm(`Delete category "${cat}" and all items inside?`)) return;
    const newInv = { ...inventory };
    delete newInv[cat];
    setInventory(newInv);
    showToast(`Deleted category ${cat}`, "error");
  };

  const handleEditCategory = () => {
    if (!editingCategory || !editingCategory.newName.trim()) return;
    const { oldName, newName } = editingCategory;
    if (inventory[newName]) { showToast("Category already exists", "error"); return; }

    const newInv = {};
    Object.keys(inventory).forEach(k => {
      if (k === oldName) newInv[newName] = inventory[k];
      else newInv[k] = inventory[k];
    });
    setInventory(newInv);
    showToast(`Renamed to ${newName}`);
    setEditingCategory(null);
  };

  const handleExport = () => {
    const rows = [
      ["Category", "Item ID", "Item Name", "Quantity"]
    ];

    Object.entries(inventory).forEach(([category, items]) => {
      items.forEach(item => {
        rows.push([
          `"${category}"`,
          item.id,
          `"${item.name.replace(/"/g, '""')}"`,
          item.qty
        ]);
      });
    });

    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Export completed!");
  };

  const openDeduct = (item, category) => {
    setDeductModal({ item, category });
    setDeductQty(1);
    setAddStockQty(0);
  };

  const handleAddOrder = () => {
    if (!newOrder.itemName || !newOrder.qty) return;
    const order = { ...newOrder, id: Date.now(), qty: parseInt(newOrder.qty), status: "Pending" };
    setPendingOrders(prev => [order, ...prev]);
    showToast(`Order logged for ${newOrder.itemName}`);
    setOrderModal(false);
    setNewOrder({ itemName: "", qty: 0, date: new Date().toISOString().split('T')[0] });
  };

  const handleReceiveOrder = (order) => {
    const categoriesList = Object.keys(inventory);
    // Try to find the item in inventory to add stock
    let found = false;
    const newInv = { ...inventory };

    for (const cat of categoriesList) {
      const itemIdx = newInv[cat].findIndex(i => i.name.toLowerCase() === order.itemName.toLowerCase());
      if (itemIdx !== -1) {
        newInv[cat][itemIdx] = { ...newInv[cat][itemIdx], qty: newInv[cat][itemIdx].qty + order.qty };
        found = true;
        break;
      }
    }

    if (!found) {
      showToast(`Item "${order.itemName}" not found in inventory. Add it first.`, "error");
      return;
    }

    setInventory(newInv);
    setPendingOrders(prev => prev.filter(o => o.id !== order.id));
    addToLog({ type: "restock", item: order.itemName, qty: order.qty, category: "Received Order" });
    showToast(`Received ${order.qty} × ${order.itemName}`);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Cancel this pending order?")) {
      setPendingOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const lowStockItems = Object.entries(inventory).flatMap(([cat, items]) =>
    items.filter(i => i.qty < 20).map(i => ({ ...i, category: cat }))
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#002639", color: "#ffffff", paddingBottom: "40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #ffffff; } ::-webkit-scrollbar-thumb { background: #54bfcf; border-radius: 3px; }
        .item-card { transition: box-shadow 0.15s, transform 0.15s; }
        .item-card:hover { box-shadow: 0 4px 20px rgba(0,38,57,0.1); transform: translateY(-1px); }
        .btn-primary { background: #002639; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; transition: background 0.15s; }
        .btn-primary:hover { background: #54bfcf; }
        .btn-danger { background: #f6ac40; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .btn-success { background: #54bfcf; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .btn-ghost { background: transparent; border: 1.5px solid #002639; padding: 8px 16px; border-radius: 8px; font-weight: 500; cursor: pointer; font-size: 13px; color: #002639; transition: all 0.15s; }
        .btn-ghost:hover { background: #002639; color: #ffffff; }
        .cat-tab { padding: 7px 16px; border-radius: 20px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .input-field { border: 1.5px solid #54bfcf; border-radius: 8px; padding: 10px 14px; font-size: 14px; font-family: inherit; width: 100%; outline: none; transition: border-color 0.15s; }
        .input-field:focus { border-color: #002639; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-box { background: white; border-radius: 16px; padding: 28px; width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
        .toast { position: fixed; bottom: 28px; right: 28px; z-index: 200; padding: 14px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        .qty-badge { font-family: 'DM Mono', monospace; font-size: 18px; font-weight: 500; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
        .header-actions { display: flex; gap: 10px; }
        .category-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
        .category-scroll::-webkit-scrollbar { display: none; }
        
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; gap: 12px; }
          .header-actions { gap: 6px; }
          .header-actions button { padding: 6px 10px; font-size: 11px !important; }
          .brand-name { display: none; }
          .main-content { padding: 16px 16px !important; }
          .stat-card { padding: 14px 18px !important; gap: 12px !important; }
          .stat-value { font-size: 22px !important; }
        }
      `}</style>

      {/* LOGIN SCREEN */}
      {!loggedIn && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyCenter: "center", padding: 20 }}>
          <div style={{ background: "#ffffff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400, boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <img src={logo} alt="Sun Scientific" style={{ height: 48, objectFit: "contain", marginBottom: 14 }} />
              <div style={{ fontWeight: 700, fontSize: 20, color: "#002639", letterSpacing: "1px" }}>SUN SCIENTIFIC</div>
              <div style={{ fontSize: 13, color: "#54bfcf", fontWeight: 500, marginTop: 4 }}>Inventory Management Portal</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#002639", display: "block", marginBottom: 6 }}>Username</label>
                <input
                  className="input-field"
                  placeholder="Enter your username"
                  value={loginForm.username}
                  onChange={e => setLoginForm(p => ({ ...p, username: e.target.value, error: "" }))}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{ color: "#002639" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#002639", display: "block", marginBottom: 6 }}>Password</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value, error: "" }))}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{ color: "#002639" }}
                />
              </div>
              {loginForm.error && (
                <div style={{ color: "#ff4d4d", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{loginForm.error}</div>
              )}
              <button
                className="btn-primary"
                style={{ background: "#002639", color: "#ffffff", marginTop: 4, padding: "12px", fontSize: 15 }}
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN APP (only shown when logged in) */}
      {loggedIn && (<>
        <div style={{ background: "#002639", color: "#002639", padding: "0 20px", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #54bfcf" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "36px" }}>
                <img src={logo} alt="Sun Scientific Logo" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
              </div>
              <div className="brand-name">
                <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: "2.5px", color: "#ffffff", fontFamily: "sans-serif" }}>SUN SCIENTIFIC</div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-ghost" style={{ background: activeTab === "Inventory" ? "#54bfcf" : "transparent", color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={() => setActiveTab("Inventory")}>
                Inventory
              </button>
              <button className="btn-ghost" style={{ background: activeTab === "Pending" ? "#54bfcf" : "transparent", color: "#ffffff", borderColor: "#54bfcf", fontSize: 13, position: "relative" }} onClick={() => setActiveTab("Pending")}>
                Pending
                {pendingOrders.length > 0 && <span style={{ position: "absolute", top: -8, right: -8, background: "#f6ac40", color: "#002639", fontSize: 10, fontWeight: 700, borderRadius: "50%", padding: "2px 6px" }}>{pendingOrders.length}</span>}
              </button>
              <div style={{ width: 1, background: "#54bfcf", height: 24, margin: "0 4px" }} />
              <button className="btn-ghost" style={{ color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={handleExport}>
                <span className="brand-name">Export</span>
              </button>
              <button className="btn-ghost" style={{ color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={() => setShowLog(true)}>
                <span className="brand-name">Log</span>
              </button>
              <button className="btn-primary" style={{ background: "#f6ac40", color: "#002639", padding: "8px 14px" }} onClick={() => setAddModal(true)}>
                + Item
              </button>
              <button className="btn-ghost" style={{ color: "#ff4d4d", borderColor: "#ff4d4d", fontSize: 13 }} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="main-content" style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 28px" }}>
          {/* LOW STOCK ALERT BANNER */}
          {lowStockItems.length > 0 && (
            <div style={{ background: "#f6ac40", borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "2px solid #002639", color: "#002639" }}>
              <div style={{ fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                ⚠️ ACTION REQUIRED: {lowStockItems.length} Items Low or Out of Stock
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {lowStockItems.slice(0, 8).map(item => (
                  <div key={item.id} style={{ background: "rgba(255,255,255,0.4)", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                    {item.name} ({item.qty})
                  </div>
                ))}
                {lowStockItems.length > 8 && <div style={{ fontSize: 12, fontWeight: 600, padding: "4px 0" }}>+ {lowStockItems.length - 8} more...</div>}
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="stats-grid">
            {[
              { label: "Total SKUs", value: totalItems, icon: "", color: "#002639" },
              { label: "Total Units", value: totalUnits.toLocaleString(), icon: "", color: "#54bfcf" },
              { label: "Low Stock Items", value: lowStockCount, icon: "", color: lowStockCount > 0 ? "#f6ac40" : "#54bfcf" },
            ].map(stat => (
              <div key={stat.label} className="stat-card" style={{ background: "#ffffff", borderRadius: 12, padding: "20px 24px", border: "2px solid #002639", display: "flex", alignItems: "center", gap: 16 }}>
                {stat.icon && <div style={{ fontSize: 28 }}>{stat.icon}</div>}
                <div>
                  <div className="stat-value" style={{ fontSize: 26, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#002639", fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTERS */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
            <input
              className="input-field"
              placeholder="Search items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: 280 }}
            />
            <div style={{ flex: 1, minWidth: "100%", overflowX: "hidden" }}>
              <div className="category-scroll">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className="cat-tab"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? "#002639" : "#ffffff",
                      color: activeCategory === cat ? "#ffffff" : "#002639",
                      border: `2px solid #002639`,
                    }}
                  >
                    {cat === "All" ? "All" : (CATEGORY_ICONS[cat] || "") + "" + cat.split(" — ")[0].split(" Material")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === "Inventory" ? (
            <>
              {/* CATEGORY SECTIONS */}
              {Object.entries(inventory).map(([category, items]) => {
                if (activeCategory !== "All" && activeCategory !== category) return null;
                const filtered = search ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())) : items;
                if (filtered.length === 0 && search) return null;
                const colors = CATEGORY_COLORS[category] || { bg: "#ffffff", accent: "#002639", light: "#ffffff" };

                return (
                  <div key={category} style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{category}</div>
                            <button onClick={() => setEditingCategory({ oldName: category, newName: category })} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>✏️</button>
                            <button onClick={() => handleDeleteCategory(category)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>🗑️</button>
                          </div>
                          <div style={{ fontSize: 12, color: "#54bfcf", fontWeight: 600 }}>{filtered.length} items · {filtered.reduce((s, i) => s + i.qty, 0).toLocaleString()} units</div>
                        </div>
                      </div>
                      <button
                        className="btn-ghost"
                        style={{ fontSize: 12 }}
                        onClick={() => { setAddItemModal(category); setNewItem({ name: "", qty: 0, category }); }}
                      >
                        + Add to this category
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                      {(() => {
                        const isApparel = category.toLowerCase().includes("apparel");
                        if (isApparel) {
                          const grouped = {};
                          filtered.forEach(item => {
                            const match = item.name.match(/^(.*?)\s*\((.*?)\)$/);
                            const bName = match ? match[1].trim() : item.name;
                            const size = match ? match[2].trim() : null;
                            if (!grouped[bName]) grouped[bName] = [];
                            grouped[bName].push({ ...item, size });
                          });

                          return Object.entries(grouped).map(([baseName, variants]) => (
                            <ApparelCard
                              key={baseName}
                              baseName={baseName}
                              variants={variants}
                              category={category}
                              openDeduct={openDeduct}
                              colors={colors}
                            />
                          ));
                        }

                        return filtered.map(item => {
                          const isLow = item.qty > 0 && item.qty < 20;
                          const isOut = item.qty === 0;
                          return (
                            <div
                              key={item.id}
                              className="item-card"
                              style={{
                                background: "#ffffff",
                                border: `2px solid ${isOut || isLow ? "#ff4d4d" : "#54bfcf"}`,
                                borderRadius: 12,
                                padding: "18px 20px",
                                cursor: "pointer",
                                boxShadow: isOut || isLow ? "0 0 10px rgba(255, 77, 77, 0.2)" : "none"
                              }}
                              onClick={() => openDeduct(item, category)}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#002639", lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{item.name}</div>
                                {isOut && <span style={{ background: "#ffffff", border: "1px solid #ff4d4d", color: "#ff4d4d", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap" }}>OUT</span>}
                                {isLow && <span style={{ background: "#ffffff", border: "1px solid #ff4d4d", color: "#ff4d4d", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap" }}>LOW</span>}
                              </div>
                              <div style={{ marginTop: 14, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                  <div className="qty-badge" style={{ color: isOut || isLow ? "#ff4d4d" : "#002639" }}>
                                    {item.qty.toLocaleString()}
                                  </div>
                                  <div style={{ fontSize: 11, color: "#54bfcf", fontWeight: 600 }}>units</div>
                                </div>
                                <div style={{ background: "#ffffff", border: `1px solid ${colors.accent}`, color: colors.accent, borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600 }}>
                                  Tap to update
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                );
              })}

              {/* ADD NEW CATEGORY */}
              <div style={{ background: "#ffffff", border: "2px dashed #002639", borderRadius: 12, padding: "20px 24px", marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 12, color: "#002639", fontSize: 14 }}>+ Create New Category</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input className="input-field" placeholder="Category name..." value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ maxWidth: 300 }} onKeyDown={e => e.key === "Enter" && handleAddCategory()} />
                  <button className="btn-primary" style={{ background: "#002639", color: "#ffffff" }} onClick={handleAddCategory}>Create</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: "#ffffff", borderRadius: 16, padding: "32px", border: "2px solid #54bfcf", color: "#002639" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>📦 Pending Orders</h2>
                <button className="btn-primary" style={{ background: "#54bfcf" }} onClick={() => setOrderModal(true)}>+ Log New Order</button>
              </div>

              {pendingOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#54bfcf" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🚚</div>
                  <div style={{ fontWeight: 600 }}>No orders pending shipment</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {pendingOrders.map(order => (
                    <div key={order.id} style={{ border: "1.5px solid #002639", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{order.itemName}</div>
                        <div style={{ fontSize: 12, color: "#54bfcf", fontWeight: 600, marginTop: 4 }}>
                          Ordered on: {order.date} · <strong>{order.qty.toLocaleString()} units</strong>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn-success" onClick={() => handleReceiveOrder(order)}>Receive Into Stock</button>
                        <button className="btn-ghost" style={{ borderColor: "#ff4d4d", color: "#ff4d4d" }} onClick={() => handleDeleteOrder(order.id)}>Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ORDER MODAL */}
        {orderModal && (
          <div className="modal-backdrop" onClick={() => setOrderModal(false)}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Log Pending Order</div>
                <button onClick={() => setOrderModal(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#ffffff" }}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Item Name</label>
                  <input className="input-field" placeholder="e.g. Patient Journey Packets" value={newOrder.itemName} onChange={e => setNewOrder(p => ({ ...p, itemName: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Order Quantity</label>
                  <input className="input-field" type="number" placeholder="3000" value={newOrder.qty} onChange={e => setNewOrder(p => ({ ...p, qty: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Date Ordered</label>
                  <input className="input-field" type="date" value={newOrder.date} onChange={e => setNewOrder(p => ({ ...p, date: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <button className="btn-primary" style={{ background: "#54bfcf", marginTop: 8 }} onClick={handleAddOrder}>Log Order</button>
              </div>
            </div>
          </div>
        )}

        {/* DEDUCT / RESTOCK MODAL */}
        {deductModal && (
          <div className="modal-backdrop" onClick={() => setDeductModal(null)}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{deductModal.item.name}</div>
                  <div style={{ fontSize: 12, color: "#54bfcf", marginTop: 2 }}>{deductModal.category}</div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button onClick={() => setEditingItem({ item: deductModal.item, category: deductModal.category, newName: deductModal.item.name, newQty: deductModal.item.qty })} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✏️</button>
                  <button onClick={handleDeleteItem} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>🗑️</button>
                  <button onClick={() => setDeductModal(null)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#ffffff", marginLeft: 8 }}>×</button>
                </div>
              </div>
              <div style={{ background: "#002639", border: "2px solid #54bfcf", borderRadius: 10, padding: "16px", textAlign: "center", marginBottom: 22 }}>
                <div style={{ fontSize: 11, color: "#ffffff", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Current Stock</div>
                <div style={{ fontSize: 44, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: deductModal.item.qty === 0 ? "#f6ac40" : "#ffffff" }}>{deductModal.item.qty}</div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 8 }}>Deduct Units (sold/used)</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => setDeductQty(q => Math.max(1, parseInt(q || 1) - 1))} style={{ width: 36, height: 36, borderRadius: 8, border: "2px solid #54bfcf", background: "#002639", color: "#ffffff", fontSize: 18, cursor: "pointer", fontWeight: 700 }}>−</button>
                  <input className="input-field" type="number" min="1" max={deductModal.item.qty} value={deductQty} onChange={e => setDeductQty(e.target.value)} style={{ textAlign: "center", width: 80, flex: "none", background: "#002639", color: "#ffffff" }} />
                  <button onClick={() => setDeductQty(q => parseInt(q || 1) + 1)} style={{ width: 36, height: 36, borderRadius: 8, border: "2px solid #54bfcf", background: "#002639", color: "#ffffff", fontSize: 18, cursor: "pointer", fontWeight: 700 }}>+</button>
                  <button className="btn-danger" style={{ flex: 1 }} onClick={handleDeduct}>Deduct</button>
                </div>
              </div>

              <div style={{ borderTop: "2px solid #54bfcf", paddingTop: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 8 }}>Restock Units</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input className="input-field" type="number" min="1" value={addStockQty} onChange={e => setAddStockQty(e.target.value)} placeholder="Qty to add" style={{ textAlign: "center", background: "#002639", color: "#ffffff" }} />
                  <button className="btn-success" style={{ whiteSpace: "nowrap" }} onClick={handleAddStock}>Add Stock</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT ITEM MODAL */}
        {editingItem && (
          <div className="modal-backdrop" onClick={() => setEditingItem(null)}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Edit Item</div>
                <button onClick={() => setEditingItem(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#ffffff" }}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Item Name</label>
                  <input className="input-field" value={editingItem.newName} onChange={e => setEditingItem(p => ({ ...p, newName: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Current Quantity</label>
                  <input className="input-field" type="number" value={editingItem.newQty} onChange={e => setEditingItem(p => ({ ...p, newQty: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <button className="btn-primary" style={{ background: "#54bfcf", color: "#ffffff", marginTop: 4 }} onClick={handleEditItem}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT CATEGORY MODAL */}
        {editingCategory && (
          <div className="modal-backdrop" onClick={() => setEditingCategory(null)}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Rename Category</div>
                <button onClick={() => setEditingCategory(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#ffffff" }}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Category Name</label>
                  <input className="input-field" value={editingCategory.newName} onChange={e => setEditingCategory(p => ({ ...p, newName: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <button className="btn-primary" style={{ background: "#54bfcf", color: "#ffffff", marginTop: 4 }} onClick={handleEditCategory}>Save Name</button>
              </div>
            </div>
          </div>
        )}

        {/* ADD ITEM MODAL */}
        {(addModal || addItemModal) && (
          <div className="modal-backdrop" onClick={() => { setAddModal(false); setAddItemModal(null); }}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Add New Item</div>
                <button onClick={() => { setAddModal(false); setAddItemModal(null); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#ffffff" }}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Item Name *</label>
                  <input className="input-field" placeholder="e.g. Blue Tote Bag" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Starting Quantity</label>
                  <input className="input-field" type="number" min="0" value={newItem.qty} onChange={e => setNewItem(p => ({ ...p, qty: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
                </div>
                {!addItemModal && (
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Category *</label>
                    <select className="input-field" value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }}>
                      <option value="">Select category...</option>
                      {Object.keys(inventory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                )}
                {addItemModal && (
                  <div style={{ background: "#002639", border: "2px solid #54bfcf", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ffffff", fontWeight: 500 }}>
                    Adding to: <strong>{addItemModal}</strong>
                  </div>
                )}
                <button className="btn-primary" style={{ marginTop: 4 }} onClick={handleAddItem}>Add Item</button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITY LOG */}
        {showLog && (
          <div className="modal-backdrop" onClick={() => setShowLog(false)}>
            <div className="modal-box" style={{ maxWidth: 500, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Activity Log</div>
                <button onClick={() => setShowLog(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#002639" }}>×</button>
              </div>
              {log.length === 0 ? (
                <div style={{ textAlign: "center", color: "#002639", padding: "32px 0" }}>No activity yet</div>
              ) : (
                <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                  {log.map((entry, i) => (
                    <div key={i} style={{ background: "#ffffff", border: "1px solid #54bfcf", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ background: "#ffffff", border: `1px solid ${entry.type === "deduct" ? "#f6ac40" : "#54bfcf"}`, color: entry.type === "deduct" ? "#f6ac40" : "#54bfcf", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, marginRight: 8 }}>
                          {entry.type === "deduct" ? "-" : "+"}{entry.qty}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#002639" }}>{entry.item}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#002639", fontWeight: 600 }}>{entry.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {toast && (
          <div className="toast" style={{ background: toast.type === "error" ? "#f6ac40" : toast.type === "info" ? "#54bfcf" : "#002639", color: "#ffffff" }}>
            {toast.msg}
          </div>
        )}
      </>)}
    </div>
  );
}