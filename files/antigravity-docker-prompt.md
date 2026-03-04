# 📦 MarketStock — Marketing Materials Inventory App
## Prompt for Antigravity / Full-Stack Docker Build

---

## OVERVIEW

Build a full-stack **Marketing Materials Inventory Management** web app called **MarketStock**. It should be simple enough for warehouse workers to use on a phone or tablet — but clean, fast, and professional. Package everything in Docker so it runs with a single `docker compose up`.

---

## TECH STACK

- **Frontend**: React (Vite) — single-page app
- **Backend**: Node.js + Express REST API
- **Database**: SQLite (via `better-sqlite3`) — file-based, no extra DB server needed
- **Docker**: `docker-compose.yml` with a single service (or frontend + backend containers)
- **Styling**: Tailwind CSS or plain CSS — clean, minimal, mobile-friendly

---

## FEATURES

### Core
1. **View all inventory** grouped by category with item name + quantity
2. **Deduct stock** — tap any item → enter qty to deduct (sold/used) → confirm
3. **Restock** — add units back to any item
4. **Add new item** — name, starting qty, category (dropdown of existing categories)
5. **Add new category** — create a new category on the fly
6. **Low stock warnings** — highlight items with qty < 10 in yellow; qty = 0 in red
7. **Activity log** — last 50 transactions with timestamp, action type, item, qty

### Nice-to-Have
- Search/filter bar across all items
- Category filter tabs
- Stats bar: total SKUs, total units, low stock count
- Toast notifications for actions
- Mobile responsive (warehouse guys may use phones)

---

## DATABASE SCHEMA

```sql
-- categories table
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '📦'
);

-- items table
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- activity_log table
CREATE TABLE activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER,
  item_name TEXT,
  category_name TEXT,
  action TEXT CHECK(action IN ('deduct','restock','added','created')),
  qty_changed INTEGER,
  qty_before INTEGER,
  qty_after INTEGER,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## SEED DATA

Pre-populate the database with this inventory on first run (if DB is empty):

### Category: MISC Marketing Materials
| Item | Qty |
|---|---|
| Keychains | 125 |
| Blue Tote Bag | 150 |
| Branded Tape | 5 |
| Pens | 100 |
| Tape Measures | 3050 |
| White Tote Bags | 2 |
| Hats | 12 |
| Bottle | 0 |

### Category: Print Marketing Materials
| Item | Qty |
|---|---|
| Brochure - English | 1100 |
| Brochure - Spanish | 900 |
| Patient Journey English | 600 |
| Patient Journey Spanish | 750 |
| Phlebolymphedema - LTA Sheet | 1100 |
| Clinical Resource Guide | 10 |
| Arm Brochure - English | 1500 |
| Arm Brochure - Spanish | 1400 |
| Vein Conference - Foam Poster 24x18 | 0 |
| Foam Conference Poster 24x18 | 0 |

### Category: Scrubs & Apparel — Men
| Item | Qty |
|---|---|
| Rep Scrubs Top (Men) S | 0 |
| Rep Scrubs Top (Men) M | 5 |
| Rep Scrubs Top (Men) L | 1 |
| Rep Scrubs Pants (Men) XS | 3 |
| Rep Scrubs Pants (Men) S | 4 |
| Rep Scrubs Pants (Men) M | 4 |
| Rep Scrubs Pants (Men) L | 3 |
| Rep Scrubs Pants (Men) XL | 4 |

### Category: Scrubs & Apparel — Women
| Item | Qty |
|---|---|
| Rep Scrubs Top (Women) XS | 2 |
| Rep Scrubs Top (Women) S | 0 |
| Rep Scrubs Top (Women) M | 8 |
| Rep Scrubs Top (Women) L | 0 |
| Rep Scrubs Top (Women) XL | 7 |
| Rep Scrubs Pants (Women) M | 7 |
| Rep Scrubs Pants (Women) S | 0 |
| Black Tee (Women) XS | 2 |
| Black Tee (Women) S | 3 |
| Black Tee (Women) M | 5 |
| Black Tee (Women) L | 2 |

---

## API ENDPOINTS

```
GET    /api/categories           — list all categories
GET    /api/items                — list all items (with category info)
GET    /api/items?category_id=X  — filter by category
POST   /api/items                — create new item { name, qty, category_id }
PATCH  /api/items/:id/deduct     — deduct stock { qty }
PATCH  /api/items/:id/restock    — add stock { qty }
POST   /api/categories           — create new category { name, icon }
GET    /api/log                  — last 50 log entries
```

---

## DOCKER SETUP

### Option A — Single container (simplest)
Serve the built React frontend as static files from the Express server.

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build        # Vite builds to /app/dist
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data   # persist SQLite DB here
    restart: unless-stopped
```

The SQLite file lives at `/app/data/inventory.db` — mounted as a volume so data persists across container restarts.

### Option B — Two containers (if preferred)
- `frontend` service: Nginx serving Vite build
- `backend` service: Node/Express API
- Both on same Docker network

---

## UX NOTES FOR WAREHOUSE WORKERS

- **Big tap targets** — buttons and item cards should be easy to tap on mobile
- **Confirm before deducting** — show current stock and new stock after deduction before confirming
- **No login required** — keep it simple, internal tool
- **Color coding**: green = healthy stock, yellow = low (< 10), red = out of stock (0)
- **One-tap deduct by 1** — default deduct qty should be 1 with easy +/- buttons

---

## PROJECT STRUCTURE

```
marketstock/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── server.js              ← Express API + static file serving
├── db/
│   ├── schema.sql
│   └── seed.js
├── data/                  ← SQLite DB lives here (gitignored)
├── src/                   ← React frontend (Vite)
│   ├── main.jsx
│   ├── App.jsx
│   └── components/
│       ├── InventoryGrid.jsx
│       ├── ItemCard.jsx
│       ├── DeductModal.jsx
│       ├── AddItemModal.jsx
│       └── ActivityLog.jsx
└── index.html
```

---

## HOW TO RUN

```bash
git clone <repo>
cd marketstock
docker compose up --build
# Open http://localhost:3000
```

Data persists in the `./data/` folder between runs.
