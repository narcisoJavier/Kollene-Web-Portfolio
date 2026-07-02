# Kollene Aika P. Leyson — Architecture Portfolio

A dark, cinematic architectural portfolio with real-time interactive 3D CAD model rendering, built for **Kollene Aika P. Leyson** (Mapúa University, BS Architecture).

---

## 🏛️ Features

- **Interactive 3D CAD Viewers:** Render SketchUp & CAD models directly in WebGL via Three.js and `@react-three/fiber`.
- **Full-Screen 3D Model Explorer:** Inspect architectural massing with orbit, pan, zoom, custom lighting modes (Studio, Sunset Warm, Night Glow), and camera resets.
- **Cinematic Dark Design System:** Tailored with warm gold accents (`#d4a574`), glassmorphism card surfaces, and technical architectural typography (Outfit & Space Grotesk).
- **Comprehensive Project Showcase:** Highlights technical specifications (site area, structural system, passive climate strategies), design concepts, and tags.
- **Architectural Methodology:** 4-step workflow breakdown from contextual analysis to 3D parametric modeling.
- **Academic Research & PDF Viewer:** In-browser modal reader for academic manuscripts, term papers, and critical essays.
- **Studio Drawing Archive:** High-resolution design plates and spot essay reviews with interactive modal zoom.
- **Smooth Inertial Scrolling:** Powered by Lenis.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Typography:** Outfit, Space Grotesk, Inter
- **Smooth Scroll:** Lenis
- **Styling:** Custom CSS Design System with CSS variables and glassmorphism

---

## 📐 How to Add New 3D CAD Models (SketchUp / AutoCAD → GLB)

### 1. From SketchUp (`.skp`)
1. Open your model in **SketchUp**.
2. Clean up unnecessary hidden geometry and purge unused materials.
3. Export as **glTF/GLB** directly if you have an extension (e.g., *glTF Exporter*), or export as **OBJ/FBX** and import into **Blender**.
4. In **Blender**:
   - Check scaling (1 unit = 1 meter).
   - Apply transforms (`Ctrl + A` &rarr; *All Transforms*).
   - (Optional) Add a *Decimate* modifier if the poly count is very high (> 100k faces).
   - Go to `File` &rarr; `Export` &rarr; `glTF 2.0 (.glb)` with Draco compression enabled.
5. Place the exported `.glb` file in `kolene-portfolio/public/models/your-model-name.glb`.

### 2. From AutoCAD (`.dwg` / `.dxf`)
1. Export the 3D solids from AutoCAD as **DXF** or **FBX**.
2. Import into **Blender** using the DXF / FBX importer.
3. Assign basic PBR materials (concrete, glass, wood, metal).
4. Export as `.glb` into `public/models/`.

### 3. Register in `src/data/content.js`
Open `src/data/content.js` and add or edit entries in the `architectureProjects` array:
```javascript
{
  id: "project-unique-id",
  title: "Project Title",
  category: "Community & Residential",
  location: "Manila, Philippines",
  year: "2026",
  model: "/models/your-model-name.glb",
  badge: "Featured 3D CAD",
  description: "Brief summary of the architectural program...",
  concept: "Design narrative and spatial intention...",
  stats: {
    siteArea: "2,500 sqm",
    structuralSystem: "Mass Timber & Steel Frame",
    passiveStrategy: "Stack Ventilation & Louvers"
  },
  tags: ["Sustainable", "Tropical", "Civic"]
}
```

---

## 🚀 Running Locally

```bash
# 1. Navigate to the project directory
cd kolene-portfolio

# 2. Install dependencies (if needed)
npm install

# 3. Start the development server
npm run dev
```

---

## 📦 Production Build

```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.
