# Project Structure Documentation

This repository follows a clean, scalable, feature-first architecture optimized for React, Next.js (App Router), React Query, Zustand, and TypeScript.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── products/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── product-groups/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── providers.tsx
│   ├── layout.tsx
│   └── page.tsx
├── features/
│   └── product/
│       ├── data/
│       │   ├── dto/
│       │   ├── mappers/
│       │   └── models/
│       ├── queries/
│       ├── api/
│       ├── stores/
│       ├── services/
│       ├── types/
│       ├── hooks/
│       ├── ui/
│       │   ├── screens/
│       │   ├── tables/
│       │   ├── sections/
│       │   ├── components/
│       │   └── forms/
│       ├── constant.ts
│       └── index.ts
├── components/
├── layout/
├── libs/
├── hooks/
├── stores/
├── types/
├── constants/
└── utils/
```

---

## 🧩 Feature-First Architecture

The `features/` directory organizes code by business domain (e.g., `product`), helping scalability and code ownership.

### **1. data/**

Contains all structures related to static data definitions.

- **dto/** — Define request/response shapes received from backend
- **models/** — Domain-level models used internally on FE
- **mappers/** — Convert DTO → Model

### **2. api/**

- `product.api.ts` — Axios wrappers for all API calls
- `product.query-key.ts` — Centralized React Query keys for consistency

### **3. queries/** (React Query hooks)

Encapsulates all fetching/mutation logic.

### **4. stores/** (Zustand)

Manages local UI or feature states.

### **5. services/**

Pure functions containing domain logic

- Price calculation
- Product validation

### **6. types/**

Feature-only TypeScript types (e.g., forms, enums…).

### **7. hooks/**

Reusable feature-specific hooks.

### **8. ui/**

All UI parts grouped clearly:

- **screens/** — Page-level UI
- **sections/** — Page subsections
- **components/** — Small reusable pieces (status badge, price…)
- **tables/** — Table setup, filters, columns config
- **forms/** — Feature-specific form components

---

## 🏛️ Other Root Directories

### **components/**

Global reusable UI components.

### **layout/**

Page and dashboard layout components.

### **libs/**

Custom-configured libraries (Axios, React Query…)

### **hooks/**

Global hooks (e.g., `use-debounce`).

### **stores/**

Global Zustand stores.

### **types/**

Global shared TypeScript types.

### **constants/**

Project-wide constants.

### **utils/**

Helper utilities (e.g., time formatting).

---

## 🚀 Development Notes

- Architecture designed for **scalability** and **feature isolation**
- React Query manages server caching and fetch lifecycles
- Zustand handles client-side UI states
- DTO → Model mapping ensures strong type safety

---

## 📌 Conventions

### Naming

- DTO: `*.dto.ts`
- Models: `*.model.ts`
- Hooks: `use-*.ts`
- Services: `*.service.ts`
- UI Components: `*.tsx`

### Import Rules

- Cross-feature imports **not allowed**
- Use feature-level `index.ts` for controlled exports

---

## 📞 Contact

For questions or improvements, please open an issue or contribute via PR.

---

**Happy coding!** 🚀
