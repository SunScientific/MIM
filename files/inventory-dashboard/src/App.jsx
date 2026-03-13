import { useState, useMemo, useEffect } from "react";
import logo from "./assets/newlogo.png";

const initialInventory = {
  "Branded Merchandise": [
    { id: 1, name: "Keychains", qty: 125, subCategory: "Merch" },
    { id: 2, name: "Blue Tote Bag (Standard)", qty: 150, subCategory: "Hand Bags" },
    { id: 3, name: "Branded Tape", qty: 5, subCategory: "Tapes" },
    { id: 4, name: "Pens", qty: 100, subCategory: "Merch" },
    { id: 5, name: "Tape Measures", qty: 3050, subCategory: "Tape Measures" },
    { id: 6, name: "Canvas White Tote Bag", qty: 2, subCategory: "Hand Bags" },
    { id: 7, name: "Hats", qty: 12, subCategory: "Merch" },
    { id: 8, name: "Bottle", qty: 7, subCategory: "Merch" },
    { id: 9, name: "Blue Tote Bag (Dvx)", qty: 50, subCategory: "Hand Bags" },
    { id: 10, name: "Luggage Tags", qty: 50, subCategory: "Merch" },
    { id: 11, name: "Speakers", qty: 0, subCategory: "Merch" },
    { id: 12, name: "Circular Stickers for Sealing", qty: 2, subCategory: "Stickers" },
    { id: 13, name: "Die-Cut Leg Sticker", qty: 0, subCategory: "Stickers" },
    { id: 14, name: "Packing Tape", qty: 0, subCategory: "Tapes" },
    { id: 15, name: "Body Tape Measure", qty: 0, subCategory: "Tape Measures" },
  ],
  "Printable Materials": [
    { id: 20, name: "Quad Fold Brochures - English", qty: 1100, subCategory: "Brochures" },
    { id: 21, name: "Quad Fold Brochures - Spanish", qty: 900, subCategory: "Brochures" },
    { id: 22, name: "Patient Journey Packets - English", qty: 600, subCategory: "Educational Literature" },
    { id: 23, name: "Patient Journey Packets - Spanish", qty: 750, subCategory: "Educational Literature" },
    { id: 24, name: "Phlebolymphedema - LTA Sheet", qty: 1100, subCategory: "Educational Literature" },
    { id: 25, name: "Clinical Resource Guide (Binder)", qty: 10, subCategory: "Educational Literature" },
    { id: 26, name: "Tri-Fold Arm Brochure - English", qty: 1500, subCategory: "Brochures" },
    { id: 27, name: "Tri-Fold Arm Brochure - Spanish", qty: 1400, subCategory: "Brochures" },
    { id: 28, name: "Compression Therapy - Poster 24x18", qty: 0, subCategory: "Poster" },
    { id: 29, name: "Great Vein - Poster 24x18", qty: 0, subCategory: "Poster" },
    { id: 30, name: "LTA/Clinician Sign Up Sheet", qty: 0, subCategory: "Forms" },
    { id: 31, name: "Lower Extremity Compression Order Form (Rx Pad)", qty: 0, subCategory: "Forms" },
    { id: 32, name: "Upper Extremity Compression Order Form (Rx Pad)", qty: 0, subCategory: "Forms" },
    { id: 33, name: "Clinical Measurement Guide (Rx Pad)", qty: 0, subCategory: "Forms" },
    { id: 34, name: "Gramatan Envelopes", qty: 0, subCategory: "Envelopes" },
    { id: 35, name: "Quickstart Guide Insert - Flex", qty: 0, subCategory: "Educational Literature" },
    { id: 36, name: "Quickstart Guide Insert - Standard", qty: 0, subCategory: "Educational Literature" },
    { id: 37, name: "Quickstart Guide Sizing Guide - Flex", qty: 0, subCategory: "Educational Literature" },
    { id: 38, name: "Quickstart Guide Sizing Guide - Standard", qty: 0, subCategory: "Educational Literature" },
    { id: 39, name: "Clinician Demo Kit Insert", qty: 0, subCategory: "Educational Literature" },
  ],
  "Apparel - Men": [
    { id: 40, name: "Scrubs Top (S)", qty: 0, subCategory: "Scrubs" },
    { id: 41, name: "Scrubs Top (M)", qty: 5, subCategory: "Scrubs" },
    { id: 42, name: "Scrubs Top (L)", qty: 1, subCategory: "Scrubs" },
    { id: 43, name: "Scrubs Pants (XS)", qty: 3, subCategory: "Scrubs" },
    { id: 44, name: "Scrubs Pants (S)", qty: 4, subCategory: "Scrubs" },
    { id: 45, name: "Scrubs Pants (M)", qty: 4, subCategory: "Scrubs" },
    { id: 46, name: "Scrubs Pants (L)", qty: 3, subCategory: "Scrubs" },
    { id: 47, name: "Scrubs Pants (XL)", qty: 4, subCategory: "Scrubs" },
    { id: 48, name: "Vest (S)", qty: 0, subCategory: "Jackets" },
    { id: 49, name: "Vest (M)", qty: 0, subCategory: "Jackets" },
    { id: 50, name: "Vest (L)", qty: 0, subCategory: "Jackets" },
    { id: 51, name: "Polos (S)", qty: 0, subCategory: "T- Shirts" },
    { id: 52, name: "Polos (M)", qty: 0, subCategory: "T- Shirts" },
    { id: 53, name: "Polos (L)", qty: 0, subCategory: "T- Shirts" },
    { id: 54, name: "1/4 zip (S)", qty: 0, subCategory: "Jackets" },
    { id: 55, name: "1/4 zip (M)", qty: 0, subCategory: "Jackets" },
    { id: 56, name: "1/4 zip (L)", qty: 0, subCategory: "Jackets" },
  ],
  "Apparel - Women": [
    { id: 60, name: "Scrubs Top (XS)", qty: 2, subCategory: "Scrubs" },
    { id: 61, name: "Scrubs Top (S)", qty: 0, subCategory: "Scrubs" },
    { id: 62, name: "Scrubs Top (M)", qty: 8, subCategory: "Scrubs" },
    { id: 63, name: "Scrubs Top (L)", qty: 0, subCategory: "Scrubs" },
    { id: 64, name: "Scrubs Top (XL)", qty: 7, subCategory: "Scrubs" },
    { id: 65, name: "Scrubs Pants (M)", qty: 7, subCategory: "Scrubs" },
    { id: 66, name: "Scrubs Pants (S)", qty: 0, subCategory: "Scrubs" },
    { id: 67, name: "Black tee (XS)", qty: 2, subCategory: "T- Shirts" },
    { id: 68, name: "Black tee (S)", qty: 3, subCategory: "T- Shirts" },
    { id: 69, name: "Black tee (M)", qty: 5, subCategory: "T- Shirts" },
    { id: 70, name: "Black tee (L)", qty: 2, subCategory: "T- Shirts" },
    { id: 71, name: "Vest (S)", qty: 0, subCategory: "Jackets" },
    { id: 72, name: "Vest (M)", qty: 0, subCategory: "Jackets" },
    { id: 73, name: "Vest (L)", qty: 0, subCategory: "Jackets" },
    { id: 74, name: "Polos (S)", qty: 0, subCategory: "T- Shirts" },
    { id: 75, name: "Polos (M)", qty: 0, subCategory: "T- Shirts" },
    { id: 76, name: "Polos (L)", qty: 0, subCategory: "T- Shirts" },
    { id: 77, name: "1/4 zip (S)", qty: 0, subCategory: "Jackets" },
    { id: 78, name: "1/4 zip (M)", qty: 0, subCategory: "Jackets" },
    { id: 79, name: "1/4 zip (L)", qty: 0, subCategory: "Jackets" },
  ],
};

const CATEGORY_ICONS = {
  "Branded Merchandise": "",
  "Printable Materials": "",
  "Apparel - Men": "",
  "Apparel - Women": "",
};

const CATEGORY_COLORS = {
  "Low Stock": { bg: "#fff5f5", accent: "#ff4d4d", light: "#ff4d4d" },
  "Out of Stock": { bg: "#fff5f5", accent: "#ff4d4d", light: "#ff4d4d" },
  "Branded Merchandise": { bg: "#ffffff", accent: "#f6ac40", light: "#002639" },
  "Printable Materials": { bg: "#ffffff", accent: "#002639", light: "#002639" },
  "Apparel - Men": { bg: "#ffffff", accent: "#54bfcf", light: "#002639" },
  "Apparel - Women": { bg: "#ffffff", accent: "#002639", light: "#002639" },
};

// -------------------------------------------------------------
// 👥 USERS LIST
// -------------------------------------------------------------
const USERS = [
  { username: "admin", password: "Aerowrap@145" },
  { username: "sanat", password: "Aerowrap@123" },
];

const CONFIG_VERSION = "1.4";

// -------------------------------------------------------------
// 📦 ITEM CARD COMPONENT
// -------------------------------------------------------------
const ItemCard = ({ item, category, openDeduct, colors }) => {
  const isLow = item.qty > 0 && item.qty < 20;
  const isOut = item.qty === 0;
  return (
    <div
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
        <div style={{ background: "#ffffff", border: "1.5px solid #000000", color: "#000000", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>
          Update
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 🏢 VENDOR CARD COMPONENT
// -------------------------------------------------------------
const VendorCard = ({ vendor, onEdit }) => {
  return (
    <div
      className="item-card"
      style={{
        background: "#ffffff",
        border: `2px solid #002639`,
        borderRadius: 12,
        padding: "18px 20px",
        cursor: "pointer",
      }}
      onClick={() => onEdit(vendor)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#002639", lineHeight: 1.3 }}>{vendor.company}</div>
        <a
          href={`mailto:${vendor.email}`}
          onClick={(e) => e.stopPropagation()}
          style={{ background: "#54bfcf", color: "#ffffff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, textDecoration: "none" }}
        >
          ✉️
        </a>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#002639", marginBottom: 4 }}>{vendor.name}</div>
      <div style={{ fontSize: 12, color: "#54bfcf", fontWeight: 500, marginBottom: 16 }}>{vendor.email}</div>
      <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
        <div style={{ fontSize: 10, color: "#54bfcf", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Products</div>
        <div style={{ fontSize: 12, color: "#002639", lineHeight: 1.4 }}>{vendor.products}</div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 👕 APPAREL CARD COMPONENT
// -------------------------------------------------------------
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
        <div style={{ background: "#ffffff", border: "1.5px solid #000000", color: "#000000", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>
          Update
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
  const [receivingOrder, setReceivingOrder] = useState(null); // order object
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [newOrder, setNewOrder] = useState({ itemName: "", qty: 0, date: new Date().toISOString().split('T')[0] });
  const [deductQty, setDeductQty] = useState(1);
  const [addStockQty, setAddStockQty] = useState(0);
  const [newItem, setNewItem] = useState({ name: "", qty: 0, category: "" });
  const [newCategory, setNewCategory] = useState("");
  const [editingItem, setEditingItem] = useState(null); // {item, category, newName, newQty, newSub}
  const [editingCategory, setEditingCategory] = useState(null); // category name
  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem("sunVendors");
    const savedVersion = localStorage.getItem("sunInventoryVersion");
    if (saved && savedVersion === CONFIG_VERSION) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });
  const [vendorModal, setVendorModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null); // vendor object
  const [newVendor, setNewVendor] = useState({ name: "", email: "", company: "", products: "" });
  const [toast, setToast] = useState(null);
  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("sunInventoryLog");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });
  const [showLog, setShowLog] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrderCategory, setSelectedOrderCategory] = useState("");
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("sunAuthUser"));

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".order-dropdown-container")) {
        setShowOrderDropdown(false);
      }
    };
    if (showOrderDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOrderDropdown]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "", error: "" });

  // Low Stock Tab Title Alert
  useEffect(() => {
    const lowItems = Object.values(inventory).flat().filter(i => i.qty < 20);
    if (lowItems.length > 0) {
      document.title = `(${lowItems.length} Low) Sun Inventory`;
    } else {
      document.title = "Sun Inventory";
    }
  }, [inventory]);

  const allItems = useMemo(() => {
    const items = [];
    Object.entries(inventory).forEach(([category, catItems]) => {
      catItems.forEach(item => {
        items.push({ name: item.name, category });
      });
    });
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [inventory]);

  const filteredOrderItems = useMemo(() => {
    if (!orderSearch) return [];
    return allItems.filter(item =>
      item.name.toLowerCase().includes(orderSearch.toLowerCase())
    );
  }, [allItems, orderSearch]);

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

  useEffect(() => {
    localStorage.setItem("sunVendors", JSON.stringify(vendors));
  }, [vendors]);

  const categories = ["All", ...Object.keys(inventory).sort((a, b) => a.localeCompare(b)), "Low Stock", "Out of Stock"];

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    // dateStr is usually YYYY-MM-DD from input[type=date]
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const addToLog = (entry) => {
    // Keep up to 1000 entries for better history retention
    const now = new Date();
    const datePart = now.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
    const timePart = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const timestamp = `${datePart}, ${timePart}`;
    setLog(prev => [{ ...entry, time: timestamp, date: datePart }, ...prev.slice(0, 999)]);
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
    const item = {
      id: nextIdState,
      name: newItem.name.trim(),
      qty: parseInt(newItem.qty) || 0,
      subCategory: newItem.subCategory ? newItem.subCategory.trim() : ""
    };
    setNextIdState(prev => prev + 1);
    if (inventory[cat]) {
      setInventory(prev => ({ ...prev, [cat]: [...prev[cat], item] }));
    } else {
      setInventory(prev => ({ ...prev, [cat]: [item] }));
    }
    addToLog({ type: "added", item: item.name, qty: item.qty, category: cat });
    showToast(`Added "${item.name}" to ${cat}`);
    setNewItem({ name: "", qty: 0, category: "", subCategory: "" });
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
    const { item, category, newName, newQty, newSub } = editingItem;
    if (!newName.trim()) return;

    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(i => i.id === item.id ? { ...i, name: newName.trim(), qty: parseInt(newQty) || 0, subCategory: newSub ? newSub.trim() : "" } : i)
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

  const handleExportLog = () => {
    const rows = [
      ["Timestamp", "Action", "Item", "Quantity", "Category", "Details"]
    ];

    log.forEach(entry => {
      rows.push([
        `"${entry.time}"`,
        `"${entry.type.toUpperCase()}"`,
        `"${entry.item.replace(/"/g, '""')}"`,
        entry.qty || 0,
        `"${entry.category || ''}"`,
        `"${(entry.details || '').replace(/"/g, '""')}"`
      ]);
    });

    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Log exported!");
  };

  const openDeduct = (item, category) => {
    setDeductModal({ item, category });
    setDeductQty(1);
    setAddStockQty(0);
  };

  const handleAddOrder = () => {
    if (!orderSearch || !newOrder.qty) return;
    const order = {
      ...newOrder,
      itemName: orderSearch,
      category: selectedOrderCategory,
      id: Date.now(),
      qty: parseInt(newOrder.qty),
      status: "Pending"
    };
    setPendingOrders(prev => [order, ...prev]);
    showToast(`Order logged for ${orderSearch}`);
    setOrderModal(false);
    setOrderSearch("");
    setSelectedOrderCategory("");
    setNewOrder({ itemName: "", qty: 0, date: new Date().toISOString().split('T')[0] });
  };

  const handleReceiveOrder = () => {
    if (!receivingOrder) return;
    const order = receivingOrder;
    const newInv = { ...inventory };

    // Use the stored category to find the item directly
    const targetCat = order.category;
    if (targetCat && newInv[targetCat]) {
      const itemIdx = newInv[targetCat].findIndex(i => i.name.toLowerCase() === order.itemName.toLowerCase());
      if (itemIdx !== -1) {
        newInv[targetCat][itemIdx] = { ...newInv[targetCat][itemIdx], qty: newInv[targetCat][itemIdx].qty + order.qty };
        setInventory(newInv);
        setPendingOrders(prev => prev.filter(o => o.id !== order.id));
        addToLog({
          type: "restock",
          item: order.itemName,
          qty: order.qty,
          category: "Received Order",
          details: `Delivered on: ${formatDisplayDate(deliveryDate)}`
        });
        showToast(`Received ${order.qty} × ${order.itemName}`);
        setReceivingOrder(null);
        return;
      }
    }

    // Fallback search if category is missing (for legacy orders)
    let found = false;
    for (const cat of Object.keys(newInv)) {
      const itemIdx = newInv[cat].findIndex(i => i.name.toLowerCase() === order.itemName.toLowerCase());
      if (itemIdx !== -1) {
        newInv[cat][itemIdx] = { ...newInv[cat][itemIdx], qty: newInv[cat][itemIdx].qty + order.qty };
        found = true;
        break;
      }
    }

    if (!found) {
      showToast(`Item "${order.itemName}" not found in inventory. Add it first.`, "error");
      setReceivingOrder(null);
      return;
    }

    setInventory(newInv);
    setPendingOrders(prev => prev.filter(o => o.id !== order.id));
    addToLog({
      type: "restock",
      item: order.itemName,
      qty: order.qty,
      category: "Received Order",
      details: `Delivered on: ${formatDisplayDate(deliveryDate)}`
    });
    showToast(`Received ${order.qty} × ${order.itemName}`);
    setReceivingOrder(null);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Cancel this pending order?")) {
      setPendingOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.company) return;
    const vendor = { ...newVendor, id: Date.now() };
    setVendors(prev => [...prev, vendor]);
    setNewVendor({ name: "", email: "", company: "", products: "" });
    setVendorModal(false);
    showToast(`Added ${vendor.company} as Vendor`);
  };

  const handleEditVendor = () => {
    if (!editingVendor) return;
    setVendors(prev => prev.map(v => v.id === editingVendor.id ? editingVendor : v));
    setEditingVendor(null);
    showToast(`Updated ${editingVendor.company}`);
  };

  const handleDeleteVendor = (id) => {
    if (window.confirm("Remove this vendor?")) {
      setVendors(prev => prev.filter(v => v.id !== id));
      showToast("Vendor removed", "info");
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
        .item-card { transition: box-shadow 0.15s, transform 0.15s; user-select: none; -webkit-tap-highlight-color: transparent; }
        .item-card:hover { box-shadow: 0 4px 20px rgba(0,38,57,0.1); transform: translateY(-1px); }
        .btn-primary { background: #002639; color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; transition: background 0.15s; }
        .btn-primary:hover { background: #54bfcf; }
        .btn-danger { background: #f6ac40; color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .btn-success { background: #54bfcf; color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .btn-ghost { background: transparent; border: 1.5px solid #002639; padding: 10px 18px; border-radius: 8px; font-weight: 500; cursor: pointer; font-size: 13px; color: #002639; transition: all 0.15s; }
        .btn-ghost:hover { background: #002639; color: #ffffff; }
        .cat-tab { padding: 8px 18px; border-radius: 20px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .input-field { border: 1.5px solid #54bfcf; border-radius: 8px; padding: 12px 16px; font-size: 15px; font-family: inherit; width: 100%; outline: none; transition: border-color 0.15s; }
        .input-field:focus { border-color: #002639; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal-box { background: white; border-radius: 16px; padding: 24px; width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto; }
        .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 200; padding: 14px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); animation: slideUpToast 0.3s ease; width: calc(100% - 40px); max-width: 400px; text-align: center; }
        @keyframes slideUpToast { from { opacity:0; transform: translate(-50%, 20px); } to { opacity:1; transform: translate(-50%, 0); } }
        .qty-badge { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .header-actions { display: flex; gap: 8px; align-items: center; }
        .category-scroll { display: flex; gap: 8px; overflow-x: auto; padding: 4px 4px 12px 4px; -webkit-overflow-scrolling: touch; scroll-padding: 0 20px; }
        .category-scroll::-webkit-scrollbar { display: none; }
        .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr; gap: 10px; }
          .nav-header { height: auto !important; padding: 16px 0 !important; flex-direction: column !important; align-items: flex-start !important; gap: 16px; }
          .header-actions { width: 100%; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
          .header-actions button { white-space: nowrap; flex-shrink: 0; padding: 8px 14px !important; }
          .main-content { padding: 16px 12px !important; }
          .stat-card { padding: 16px 20px !important; }
          .stat-value { font-size: 24px !important; }
          .item-grid { grid-template-columns: 1fr; gap: 12px; }
          .modal-box { padding: 20px; width: 100%; margin: 0; }
          .brand-name-full { font-size: 14px !important; letter-spacing: 1px !important; }
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
          <div className="nav-header" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "36px" }}>
                <img src={logo} alt="Sun Scientific Logo" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
              </div>
              <div className="brand-name">
                <div className="brand-name-full" style={{ fontWeight: 600, fontSize: 18, letterSpacing: "2.5px", color: "#ffffff", fontFamily: "sans-serif" }}>SUN SCIENTIFIC</div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-ghost" style={{ background: activeTab === "Inventory" ? "#54bfcf" : "transparent", color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={() => setActiveTab("Inventory")}>
                Inventory
              </button>
              <button className="btn-ghost" style={{ background: activeTab === "Pending" ? "#54bfcf" : "transparent", color: "#ffffff", borderColor: "#54bfcf", fontSize: 13, position: "relative" }} onClick={() => setActiveTab("Pending")}>
                Pending
                {pendingOrders.length > 0 && <span style={{ position: "absolute", top: -8, right: -4, background: "#f6ac40", color: "#002639", fontSize: 10, fontWeight: 700, borderRadius: "50%", minWidth: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{pendingOrders.length}</span>}
              </button>
              <button className="btn-ghost" style={{ background: activeTab === "Vendors" ? "#54bfcf" : "transparent", color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={() => setActiveTab("Vendors")}>
                Vendors
              </button>
              <div className="brand-name" style={{ width: 1, background: "#54bfcf", height: 24, margin: "0 4px" }} />
              <button className="btn-ghost" style={{ color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={handleExport}>
                Export
              </button>
              <button className="btn-ghost" style={{ color: "#ffffff", borderColor: "#54bfcf", fontSize: 13 }} onClick={() => setShowLog(true)}>
                Log
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
          {/* STATS */}
          <div className="stats-grid">
            {[
              { label: "Total SKUs", value: totalItems, icon: "", color: "#002639" },
              { label: "Total Units", value: totalUnits.toLocaleString(), icon: "", color: "#54bfcf" },
              { label: "Low Stock Items", value: lowStockCount, icon: "", color: lowStockCount > 0 ? "#f6ac40" : "#54bfcf" },
            ].map(stat => (
              <div key={stat.label} className="stat-card" style={{ background: "#ffffff", borderRadius: 12, padding: "20px 24px", border: "2px solid #002639", display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <div className="stat-value" style={{ fontSize: 26, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#002639", fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTERS */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ width: "100%", maxWidth: "100%", flex: "1 1 auto" }}>
              <input
                className="input-field"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
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
                      border: `2px solid ${cat.includes("Stock") ? "#ff4d4d" : "#002639"}`,
                      boxShadow: activeCategory === cat && cat.includes("Stock") ? "0 0 10px rgba(255, 77, 77, 0.3)" : "none"
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
              {/* VIRTUAL CATEGORIES FOR MONITORING */}
              {(() => {
                const outOfStock = Object.entries(inventory).flatMap(([cat, items]) =>
                  items.filter(i => i.qty === 0).map(i => ({ ...i, originalCategory: cat }))
                );
                const lowStock = Object.entries(inventory).flatMap(([cat, items]) =>
                  items.filter(i => i.qty > 0 && i.qty < 20).map(i => ({ ...i, originalCategory: cat }))
                );

                const sections = [];
                if (activeCategory === "Out of Stock") {
                  if (outOfStock.length > 0) sections.push({ name: "Out of Stock", items: outOfStock, color: "#ff4d4d" });
                }
                if (activeCategory === "Low Stock") {
                  if (lowStock.length > 0) sections.push({ name: "Low Stock", items: lowStock, color: "#ff4d4d" });
                }

                return sections.map(section => (
                  <div key={section.name} style={{ marginBottom: 32, padding: "20px", background: "rgba(255, 77, 77, 0.05)", border: `2px solid ${section.color}`, borderRadius: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: section.color }}>{section.name}</div>
                      <div style={{ fontSize: 12, color: section.color, fontWeight: 600 }}>{section.items.length} items requiring attention</div>
                    </div>
                    <div className="item-grid">
                      {section.items.map(item => (
                        <div
                          key={`${section.name}-${item.id}`}
                          className="item-card"
                          style={{
                            background: "#ffffff",
                            border: `2px solid ${section.color}`,
                            borderRadius: 12,
                            padding: "18px 20px",
                            cursor: "pointer",
                            boxShadow: "0 0 10px rgba(255, 77, 77, 0.1)"
                          }}
                          onClick={() => openDeduct(item, item.originalCategory)}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#002639", lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{item.name}</div>
                            <span style={{ fontSize: 10, color: section.color, fontWeight: 800, textTransform: "uppercase" }}>{item.originalCategory.split(' ')[0]}</span>
                          </div>
                          <div style={{ marginTop: 14, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                            <div>
                              <div className="qty-badge" style={{ color: section.color }}>{item.qty}</div>
                              <div style={{ fontSize: 11, color: "#54bfcf", fontWeight: 600 }}>units</div>
                            </div>
                            <div style={{ background: "#ffffff", border: "1.5px solid #000000", color: "#000000", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>
                              Update
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}

              {/* REGULAR CATEGORY SECTIONS */}
              {Object.entries(inventory)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, items]) => {
                  if (activeCategory !== "All" && activeCategory !== category) return null;
                  if (activeCategory === "Out of Stock" || activeCategory === "Low Stock") return null;
                  const filtered = search ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())) : items;
                  if (filtered.length === 0 && search) return null;
                  const colors = CATEGORY_COLORS[category] || { bg: "#ffffff", accent: "#002639", light: "#ffffff" };
                  const sortedItems = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

                  return (
                    <div key={category} style={{ marginBottom: 40 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, fontSize: 18, color: "#ffffff" }}>{category}</div>
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                              <button onClick={() => setEditingCategory({ oldName: category, newName: category })} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, filter: "brightness(0) invert(1)", opacity: 0.8, textDecoration: "none", padding: "4px" }}>✏️</button>
                              <button onClick={() => handleDeleteCategory(category)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, filter: "brightness(0) invert(1)", opacity: 0.8, textDecoration: "none", padding: "4px" }}>🗑️</button>
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: "#54bfcf", fontWeight: 600 }}>{filtered.length} items · {filtered.reduce((s, i) => s + i.qty, 0).toLocaleString()} units</div>
                        </div>
                        <button
                          className="btn-success"
                          style={{ padding: "10px 18px", fontSize: 13, whiteSpace: "nowrap" }}
                          onClick={() => { setAddItemModal(category); setNewItem({ name: "", qty: 0, category }); }}
                        >
                          + Add Item
                        </button>
                      </div>

                      <div className="item-grid">
                        {(() => {
                          // Combined Subcategory & Apparel grouping logic
                          const subGrouped = {};
                          const ungrouped = [];
                          sortedItems.forEach(item => {
                            const sub = item.subCategory || "";
                            if (sub) {
                              if (!subGrouped[sub]) subGrouped[sub] = [];
                              subGrouped[sub].push(item);
                            } else {
                              ungrouped.push(item);
                            }
                          });

                          const renderGroup = (itemsToRender) => {
                            const isApparel = category.toLowerCase().includes("apparel");
                            if (isApparel) {
                              const apparelGrouped = {};
                              itemsToRender.forEach(item => {
                                const match = item.name.match(/^(.*?)\s*\((.*?)\)$/);
                                const bName = match ? match[1].trim() : item.name;
                                const size = match ? match[2].trim() : null;
                                if (!apparelGrouped[bName]) apparelGrouped[bName] = [];
                                apparelGrouped[bName].push({ ...item, size });
                              });

                              return Object.entries(apparelGrouped).map(([baseName, variants]) => (
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
                            return itemsToRender.map(item => (
                              <ItemCard key={item.id} item={item} category={category} openDeduct={openDeduct} colors={colors} />
                            ));
                          };

                          if (Object.keys(subGrouped).length > 0) {
                            return (
                              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 32 }}>
                                {Object.entries(subGrouped)
                                  .sort(([a], [b]) => a.localeCompare(b))
                                  .map(([subCat, subItems]) => (
                                    <div key={subCat}>
                                      <div style={{ fontSize: 12, fontWeight: 800, color: "#54bfcf", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12, paddingBottom: 6, borderBottom: "1px solid rgba(84, 191, 207, 0.2)", display: "flex", alignItems: "center", gap: 10 }}>
                                        {subCat}
                                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>({subItems.length})</span>
                                      </div>
                                      <div className="item-grid">
                                        {renderGroup(subItems)}
                                      </div>
                                    </div>
                                  ))}
                                {ungrouped.length > 0 && (
                                  <div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: "#54bfcf", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12, paddingBottom: 6, borderBottom: "1px solid rgba(84, 191, 207, 0.2)" }}>Others</div>
                                    <div className="item-grid">
                                      {renderGroup(ungrouped)}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return renderGroup(sortedItems);
                        })()}
                      </div>
                    </div>
                  );
                })}

              {/* ADD NEW CATEGORY */}
              <div style={{ background: "#ffffff", border: "2px dashed #54bfcf", borderRadius: 12, padding: "24px", marginTop: 12, textAlign: "center" }}>
                <div style={{ fontWeight: 700, marginBottom: 16, color: "#002639", fontSize: 16 }}>+ Create New Category</div>
                <div style={{ display: "flex", gap: 10, flexDirection: "column", maxWidth: 400, margin: "0 auto" }}>
                  <input className="input-field" placeholder="e.g. New Seasonal Items" value={newCategory} onChange={e => setNewCategory(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddCategory()} />
                  <button className="btn-primary" onClick={handleAddCategory}>Create Category</button>
                </div>
              </div>
            </>
          ) : activeTab === "Pending" ? (
            <div style={{ background: "#ffffff", borderRadius: 16, padding: "24px", border: "2px solid #54bfcf", color: "#002639" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Pending Orders</h2>
                <button className="btn-primary" style={{ background: "#54bfcf" }} onClick={() => setOrderModal(true)}>+ Log Order</button>
              </div>

              {pendingOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#54bfcf" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>Shipment</div>
                  <div style={{ fontWeight: 600 }}>No orders pending shipment</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {pendingOrders.map(order => (
                    <div key={order.id} style={{ border: "1.5px solid #002639", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{order.itemName}</div>
                        <div style={{ fontSize: 12, color: "#54bfcf", fontWeight: 600, marginTop: 4 }}>
                          Ordered on: {formatDisplayDate(order.date)} · <strong>{order.qty.toLocaleString()} units</strong>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, width: "100%", smWidth: "auto", justifyContent: "flex-end" }}>
                        <button className="btn-success" style={{ flex: 1, smFlex: "initial" }} onClick={() => { setReceivingOrder(order); setDeliveryDate(new Date().toISOString().split('T')[0]); }}>Receive</button>
                        <button className="btn-ghost" style={{ borderColor: "#ff4d4d", color: "#ff4d4d" }} onClick={() => handleDeleteOrder(order.id)}>Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* VENDORS VIEW */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <input
                    className="input-field"
                    placeholder="Search vendors or companies..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="btn-primary" style={{ background: "#002639", color: "#ffffff" }} onClick={() => setVendorModal(true)}>+ Add Vendor</button>
              </div>

              <div className="item-grid">
                {vendors
                  .filter(v =>
                    v.name.toLowerCase().includes(search.toLowerCase()) ||
                    v.company.toLowerCase().includes(search.toLowerCase()) ||
                    v.products.toLowerCase().includes(search.toLowerCase())
                  )
                  .sort((a, b) => a.company.localeCompare(b.company))
                  .map(vendor => (
                    <VendorCard key={vendor.id} vendor={vendor} onEdit={setEditingVendor} />
                  ))
                }
              </div>
            </>
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
                <div style={{ position: "relative" }} className="order-dropdown-container">
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Item Name</label>
                  <input
                    className="input-field"
                    placeholder="Search existing or type new..."
                    value={orderSearch}
                    onChange={e => {
                      setOrderSearch(e.target.value);
                      setShowOrderDropdown(true);
                      setSelectedOrderCategory("");
                    }}
                    onFocus={() => setShowOrderDropdown(true)}
                    style={{ background: "#002639", color: "#ffffff" }}
                  />
                  {showOrderDropdown && (orderSearch || allItems.length > 0) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#ffffff",
                        border: "1.5px solid #54bfcf",
                        borderRadius: "8px",
                        marginTop: "4px",
                        maxHeight: "180px",
                        overflowY: "auto",
                        zIndex: 110,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                      }}
                    >
                      {(orderSearch === "" ? allItems : filteredOrderItems).map(item => (
                        <div
                          key={`${item.name}-${item.category}`}
                          style={{
                            padding: "10px 14px",
                            color: "#002639",
                            cursor: "pointer",
                            borderBottom: "1px solid #f0f0f0",
                            fontSize: "14px",
                            fontWeight: 500
                          }}
                          onClick={() => {
                            setOrderSearch(item.name);
                            setSelectedOrderCategory(item.category);
                            setShowOrderDropdown(false);
                          }}
                          onMouseOver={e => e.currentTarget.style.background = "#f8f9fa"}
                          onMouseOut={e => e.currentTarget.style.background = "#ffffff"}
                        >
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: "11px", color: "#54bfcf" }}>{item.category}</div>
                        </div>
                      ))}
                      {orderSearch && !allItems.some(n => n.name.toLowerCase() === orderSearch.toLowerCase()) && (
                        <div
                          style={{
                            padding: "12px 14px",
                            color: "#54bfcf",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 700,
                            background: "rgba(84, 191, 207, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}
                          onClick={() => {
                            setNewItem(p => ({ ...p, name: orderSearch }));
                            setAddModal(true);
                            setOrderModal(false);
                            setShowOrderDropdown(false);
                          }}
                        >
                          <span style={{ fontSize: "16px" }}>+</span> Add "{orderSearch}" as New Item
                        </div>
                      )}
                      {(orderSearch === "" ? allItems : filteredOrderItems).length === 0 && !orderSearch && (
                        <div style={{ padding: "12px", color: "#999", fontSize: "13px", textAlign: "center" }}>
                          No items in inventory
                        </div>
                      )}
                    </div>
                  )}
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

        {/* RECEIVE ORDER CONFIRMATION MODAL */}
        {receivingOrder && (
          <div className="modal-backdrop" onClick={() => setReceivingOrder(null)}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Confirm Receipt</div>
                <button onClick={() => setReceivingOrder(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#ffffff" }}>×</button>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 14, marginBottom: 8 }}>You are receiving:</div>
                <div style={{ background: "rgba(84, 191, 207, 0.1)", border: "1.5px solid #54bfcf", borderRadius: 8, padding: "12px", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{receivingOrder.itemName}</div>
                  <div style={{ fontSize: 13, color: "#54bfcf" }}>Quantity: {receivingOrder.qty.toLocaleString()} units</div>
                </div>

                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>When were these delivered?</label>
                <input
                  className="input-field"
                  type="date"
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  style={{ background: "#002639", color: "#ffffff" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-success" style={{ flex: 1 }} onClick={handleReceiveOrder}>Confirm & Add to Stock</button>
                <button className="btn-ghost" style={{ borderColor: "#ffffff", color: "#ffffff" }} onClick={() => setReceivingOrder(null)}>Cancel</button>
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
                  <button onClick={() => setEditingItem({ item: deductModal.item, category: deductModal.category, newName: deductModal.item.name, newQty: deductModal.item.qty, newSub: deductModal.item.subCategory || "" })} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", filter: "brightness(0) invert(1)", opacity: 0.8, textDecoration: "none" }}>✏️</button>
                  <button onClick={handleDeleteItem} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", filter: "brightness(0) invert(1)", opacity: 0.8, textDecoration: "none" }}>🗑️</button>
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
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Subcategory (Optional)</label>
                  <input className="input-field" placeholder="e.g. Brochures" value={editingItem.newSub} onChange={e => setEditingItem(p => ({ ...p, newSub: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
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
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Subcategory (Optional)</label>
                  <input className="input-field" placeholder="e.g. Brochures" value={newItem.subCategory} onChange={e => setNewItem(p => ({ ...p, subCategory: e.target.value }))} style={{ background: "#002639", color: "#ffffff" }} />
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
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>Activity Log</div>
                  <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 11, background: "#002639", color: "#ffffff", borderColor: "#54bfcf" }} onClick={handleExportLog}>Download Excel (CSV)</button>
                </div>
                <button onClick={() => setShowLog(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#002639" }}>×</button>
              </div>
              {log.length === 0 ? (
                <div style={{ textAlign: "center", color: "#002639", padding: "32px 0" }}>No activity yet</div>
              ) : (
                <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
                  {(() => {
                    const groups = {};
                    log.forEach(entry => {
                      // Use entry.date if available, otherwise try to extract it from entry.time
                      const dateKey = entry.date || (entry.time.includes(',') ? entry.time.split(',')[0] : "Recent");
                      if (!groups[dateKey]) groups[dateKey] = [];
                      groups[dateKey].push(entry);
                    });
                    
                    return Object.entries(groups).map(([date, entries]) => (
                      <div key={date}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#54bfcf", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, paddingBottom: 4, borderBottom: "1.5px solid #eee" }}>
                          {date}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {entries.map((entry, idx) => (
                            <div key={idx} style={{ background: "#f8f9fa", border: "1px solid #e9ecef", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ 
                                  background: entry.type === "deduct" ? "#fff5f5" : "#f0fff4", 
                                  border: `1px solid ${entry.type === "deduct" ? "#ff4d4d" : "#54bfcf"}`, 
                                  color: entry.type === "deduct" ? "#ff4d4d" : "#54bfcf", 
                                  fontSize: 11, 
                                  fontWeight: 800, 
                                  padding: "3px 10px", 
                                  borderRadius: 20,
                                  minWidth: "50px",
                                  textAlign: "center"
                                }}>
                                  {entry.type === "deduct" ? "−" : entry.type === "delete" ? "✕" : "+"}{entry.qty || ""}
                                </span>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#002639" }}>
                                  {entry.item}
                                  {entry.details && <div style={{ fontSize: 11, color: "#54bfcf", fontWeight: 500, marginTop: 2 }}>{entry.details}</div>}
                                  <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{entry.category}</div>
                                </div>
                              </div>
                              <span style={{ fontSize: 11, color: "#54bfcf", fontWeight: 600, whiteSpace: "nowrap" }}>
                                {entry.time.includes(',') ? entry.time.split(',')[1].trim() : entry.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
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
        {/* VENDOR MODAL */}
        {(vendorModal || editingVendor) && (
          <div className="modal-backdrop" onClick={() => { setVendorModal(false); setEditingVendor(null); }}>
            <div className="modal-box" style={{ background: "#002639", border: "2px solid #ffffff", color: "#ffffff" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{editingVendor ? "Edit Vendor" : "Add New Vendor"}</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {editingVendor && <button onClick={() => handleDeleteVendor(editingVendor.id)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", filter: "brightness(0) invert(1)", opacity: 0.8 }}>🗑️</button>}
                  <button onClick={() => { setVendorModal(false); setEditingVendor(null); }} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#ffffff" }}>×</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Company Name *</label>
                  <input
                    className="input-field"
                    value={editingVendor ? editingVendor.company : newVendor.company}
                    onChange={e => editingVendor ? setEditingVendor(p => ({ ...p, company: e.target.value })) : setNewVendor(p => ({ ...p, company: e.target.value }))}
                    style={{ background: "#002639", color: "#ffffff" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Contact Name *</label>
                  <input
                    className="input-field"
                    value={editingVendor ? editingVendor.name : newVendor.name}
                    onChange={e => editingVendor ? setEditingVendor(p => ({ ...p, name: e.target.value })) : setNewVendor(p => ({ ...p, name: e.target.value }))}
                    style={{ background: "#002639", color: "#ffffff" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Contact Email</label>
                  <input
                    className="input-field"
                    value={editingVendor ? editingVendor.email : newVendor.email}
                    onChange={e => editingVendor ? setEditingVendor(p => ({ ...p, email: e.target.value })) : setNewVendor(p => ({ ...p, email: e.target.value }))}
                    style={{ background: "#002639", color: "#ffffff" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", display: "block", marginBottom: 6 }}>Products / Details</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={editingVendor ? editingVendor.products : newVendor.products}
                    onChange={e => editingVendor ? setEditingVendor(p => ({ ...p, products: e.target.value })) : setNewVendor(p => ({ ...p, products: e.target.value }))}
                    style={{ background: "#002639", color: "#ffffff", resize: "none" }}
                  />
                </div>
                <button className="btn-primary" style={{ marginTop: 4, background: "#54bfcf", color: "#ffffff" }} onClick={editingVendor ? handleEditVendor : handleAddVendor}>
                  {editingVendor ? "Save Changes" : "Add Vendor"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>)}
    </div>
  );
}