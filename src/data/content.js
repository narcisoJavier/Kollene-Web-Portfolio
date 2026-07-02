export const profile = {
  name: "Kollene Aika P. Leyson",
  shortName: "Kollene Aika",
  title: "Architectural Designer & BS Architecture Student",
  institution: "Mapúa University",
  degree: "Bachelor of Science in Architecture",
  email: "leysonkolleneaika@gmail.com",
  studentId: "2023106041",
  section: "A58",
  course: "AR135-1",
  location: "Manila, Philippines",
  tagline: "Designing spatial narratives at the intersection of climate resilience, Filipino cultural identity, and human-centered innovation.",
  quote: {
    text: "Architecture is not just about creating buildings — it is about shaping the way people live.",
    author: "Norman Foster",
  },
  about: [
    "I am an aspiring architect in my third year of the BS Architecture program at Mapúa University, driven by the belief that architecture must create meaningful, sustainable, and socially responsive environments.",
    "My architectural exploration is grounded in tropical design principles, disaster-resilient planning, and contemporary interpretations of indigenous Filipino materiality. I seek to bridge computational modeling with rigorous site-specific context.",
    "From conceptual sketching to parametric 3D CAD modeling and detailed construction drawings, each project represents a dedicated balance between spatial poeticism and structural practicality."
  ],
  interests: [
    "Community-Centered Design",
    "Heritage Conservation & Adaptive Reuse",
    "Filipino Identity in Tropical Architecture",
    "Passive Cooling & Bioclimatic Strategies",
    "Disaster-Resilient Community Infrastructure",
    "Parametric & Computational Form-Finding"
  ],
  skills: [
    { name: "AutoCAD & 2D Drafting", level: "95%" },
    { name: "SketchUp & 3D Modeling", level: "90%" },
    { name: "Revit / BIM Workflow", level: "80%" },
    { name: "Lumion & V-Ray Visualization", level: "85%" },
    { name: "Photoshop & Diagramming", level: "90%" },
    { name: "Climate & Environmental Analysis", level: "85%" }
  ]
};

export const architectureProjects = [
  {
    id: "project-rang-ay",
    title: "RANG-AY: AgriHub & Resilience Center",
    category: "Community & Agricultural Infrastructure",
    location: "Urdaneta City, Pangasinan",
    year: "2026",
    model: "/models/12.glb",
    type: "3d-cad",
    badge: "Featured 3D CAD",
    description: "An integrated agricultural hub combining farmer support services, grain drying pavilions, and elevated flood-resilient community infrastructure designed with passive ventilation.",
    concept: "Merging traditional bamboo-truss canopy typologies with flood-adaptive elevated platforms to foster economic autonomy for rural farmers.",
    stats: {
      siteArea: "3,850 sqm",
      buildingFootprint: "1,420 sqm",
      structuralSystem: "Engineered Timber & RC Core",
      passiveStrategy: "Stack Ventilation & Rain Harvesting"
    },
    tags: ["Agricultural", "Flood-Resilient", "Tropical Design", "Community"],
    previewImage: "/gallery/reference_planning2_portfolio.png",
    modelConfig: {
      scale: 1.2,
      position: [0, -0.8, 0],
      cameraPosition: [4, 3, 5],
      ambientIntensity: 0.8,
      keyLightIntensity: 2.2
    }
  },
  {
    id: "project-filipinism",
    title: "Bahay Na Bato 2.0: Tropical Climate Pavilion",
    category: "Sustainable & Cultural Heritage",
    location: "Intramuros / Manila Context",
    year: "2026",
    model: "/models/12.glb",
    type: "3d-cad",
    badge: "Sustainable Design",
    description: "Reinterpreting ancestral Filipino 'Bahay na Bato' structural layering for modern high-density urban environments using capiz screens, deep overhangs, and natural convective cooling.",
    concept: "Recontextualizing porous envelope tectonics to mitigate urban heat islands without heavy mechanical HVAC reliance.",
    stats: {
      siteArea: "1,200 sqm",
      floors: "3 Levels",
      structuralSystem: "Mass Timber & Capiz Lattice",
      passiveStrategy: "Ventriloquist Breezeways & Thermal Mass"
    },
    tags: ["Heritage", "Vernacular", "Sustainable", "Passive Cooling"],
    previewImage: "/gallery/d94b13a4-6eec-4c45-8adf-f6cb9792b062_p1.png",
    modelConfig: {
      scale: 1.1,
      position: [0, -0.6, 0],
      cameraPosition: [3.5, 2.5, 4.5],
      ambientIntensity: 0.9,
      keyLightIntensity: 2.0
    }
  },
  {
    id: "project-community-hub",
    title: "Women's Empowerment & Community Center",
    category: "Civic & Social Development",
    location: "Metro Manila",
    year: "2026",
    model: "/models/12.glb",
    type: "3d-cad",
    badge: "Social Impact",
    description: "A multipurpose civic sanctuary offering vocational workshops, community health nodes, and daycare spaces arranged around a courtyard for natural light and collective gathering.",
    concept: "Radial organization centered on a sunlit central atrium, promoting safety, visibility, and inclusive community engagement.",
    stats: {
      siteArea: "2,100 sqm",
      capacity: "400 Persons",
      structuralSystem: "Hybrid Steel & Perforated Screens",
      passiveStrategy: "Daylighting & Courtyard Microclimate"
    },
    tags: ["Civic", "Social Impact", "Daylight Design", "Courtyard Typology"],
    previewImage: "/gallery/CamScanner_06-06-2026_12.34_1_p1.png",
    modelConfig: {
      scale: 1.15,
      position: [0, -0.7, 0],
      cameraPosition: [4, 2.8, 4.8],
      ambientIntensity: 0.85,
      keyLightIntensity: 2.1
    }
  }
];

export const designProcessSteps = [
  {
    number: "01",
    phase: "Site & Climate Context",
    title: "Contextual Investigation",
    description: "Analyzing microclimate, solar angles, prevailing monsoon winds, topographical contours, and local socio-cultural fabric before drawing the first line.",
    tags: ["Sun Path Analysis", "Wind Studies", "Urban Mapping"]
  },
  {
    number: "02",
    phase: "Conceptual Form-Finding",
    title: "Spatial Massing & Sketches",
    description: "Translating program narratives into volumetric massing models, exploring circulation flow, daylight penetration, and structural hierarchies.",
    tags: ["Massing Models", "Hand Sketches", "Diagrammatic Section"]
  },
  {
    number: "03",
    phase: "3D CAD & Digital Craft",
    title: "Parametric & BIM Modeling",
    description: "Detailing architectural tectonics in SketchUp, AutoCAD, and Revit with rigorous dimensional accuracy, material articulation, and assembly logistics.",
    tags: ["3D CAD Modeling", "Tectonic Detailing", "BIM Coordination"]
  },
  {
    number: "04",
    phase: "Performance & Visualization",
    title: "Atmosphere & Presentation",
    description: "Evaluating thermal performance, daylighting distribution, and producing cinematic architectural renders alongside comprehensive construction plates.",
    tags: ["Raytraced Renders", "Working Drawings", "Interactive 3D"]
  }
];

export const academicWorks = [
  {
    id: "rang-ay",
    title: "RANG-AY: AgriHub in Urdaneta City, Pangasinan",
    category: "Term Paper",
    pdf: "/pdf/A58_LEYSON_TERM+PAPER.pdf",
    preview: "/previews/A58_LEYSON_TERM_PAPER_thumb.png",
    date: "June 19, 2026",
    description: "Final term paper proposing an integrated agricultural hub combining farmer support services with flood-responsive design.",
  },
  {
    id: "filipinism",
    title: "Filipinism: A Model For Sustainable Architecture In Tropical Climates",
    category: "Co-Authored Paper",
    pdf: "/pdf/LEYSON_Module+1+Paper_revised.pdf",
    preview: "/previews/LEYSON_Module_1_Paper_revised_thumb.png",
    date: "May 08, 2026",
    description: "Explores how traditional Filipino architectural principles offer sustainable, climate-responsive alternatives to imported Western styles.",
  },
  {
    id: "ang-larawan",
    title: "Reading Architecture Through Ang Larawan",
    category: "Reflective Writing",
    pdf: "/pdf/LEYSON_C02_P1_REFLECTIVE+WRITING.pdf",
    preview: "/previews/LEYSON_C02_P1_REFLECTIVE_WRITING_thumb.png",
    date: "2026",
    description: "Film analysis exploring how ancestral residential architecture embodies cultural preservation versus modernization.",
  },
  {
    id: "farmers-hub",
    title: "A Farmers Development and Community Resilience Hub",
    category: "Research Proposal",
    pdf: "/pdf/OPTION_1_LEYSON_TERM_PAPER (1).pdf",
    preview: "/previews/OPTION_1_LEYSON_TERM_PAPER__1__thumb.png",
    date: "2026",
    description: "Proposal for an agricultural center integrating supply chain infrastructure with disaster-ready refuge capacity.",
  },
  {
    id: "womens-hub",
    title: "A Women Empowerment and Livelihood Hub",
    category: "Research Proposal",
    pdf: "/pdf/OPTION_2_LEYSON_TERM_PAPER (1).pdf",
    preview: "/previews/OPTION_2_LEYSON_TERM_PAPER__1__thumb.png",
    date: "2026",
    description: "Civic blueprint designed for skill incubators, community health support, and flexible artisanal spaces.",
  },
  {
    id: "peer-review",
    title: "Peer Review - Sa Pagitan ng Kasaysayan at Kinabukasan",
    category: "Peer Review",
    pdf: "/pdf/PEER_REVIEW_A58.pdf",
    preview: "/previews/PEER_REVIEW_A58_thumb.png",
    date: "June 19, 2026",
    description: "Critical review examining heritage conservation methodologies for the historic district of Imus City.",
  },
  {
    id: "reflection",
    title: "My Journey in Architecture: Growth, Motivation, and Aspirations",
    category: "Reflection",
    pdf: "/pdf/REFLECTION_ASSIGNMENT.pdf",
    preview: "/previews/REFLECTION_ASSIGNMENT_thumb.png",
    date: "April 10, 2026",
    description: "Personal essay on architectural education, design ethics, and aspirations for future practice.",
  },
];

export const galleryItems = [
  { id: "plate-1", title: "Design Plate: Urban Spatial Analysis", category: "Design Plates", src: "/gallery/CamScanner_06-06-2026_12.34_1_p1.png", type: "image" },
  { id: "plate-2", title: "Design Plate: Site & Elevation Study", category: "Design Plates", src: "/gallery/d94b13a4-6eec-4c45-8adf-f6cb9792b062_p1.png", type: "image" },
  { id: "plate-ref", title: "Master Planning & Axonometric View", category: "Design Plates", src: "/gallery/reference_planning2_portfolio.png", type: "image" },
  { id: "spot-essay-1", title: "Spot Essay: Tectonic Theory - Sheet 1", category: "Design Plates", src: "/gallery/LEYSON_SPOT_ESSAY_p1.png", type: "image" },
  { id: "spot-essay-2", title: "Spot Essay: Spatial Sequence - Sheet 2", category: "Design Plates", src: "/gallery/LEYSON_SPOT_ESSAY_p2.png", type: "image" },
  { id: "gallery-term-paper", title: "RANG-AY AgriHub - Comprehensive Paper", category: "Academic Papers", pdf: "/pdf/A58_LEYSON_TERM+PAPER.pdf", preview: "/previews/A58_LEYSON_TERM_PAPER_thumb.png", type: "pdf" },
  { id: "gallery-filipinism", title: "Filipinism: Sustainable Tropical Design", category: "Academic Papers", pdf: "/pdf/LEYSON_Module+1+Paper_revised.pdf", preview: "/previews/LEYSON_Module_1_Paper_revised_thumb.png", type: "pdf" },
  { id: "gallery-ang-larawan", title: "Reading Architecture Through Ang Larawan", category: "Reflections", pdf: "/pdf/LEYSON_C02_P1_REFLECTIVE+WRITING.pdf", preview: "/previews/LEYSON_C02_P1_REFLECTIVE_WRITING_thumb.png", type: "pdf" },
  { id: "gallery-farmers-hub", title: "Farmers Development Hub Proposal", category: "Academic Papers", pdf: "/pdf/OPTION_1_LEYSON_TERM_PAPER (1).pdf", preview: "/previews/OPTION_1_LEYSON_TERM_PAPER__1__thumb.png", type: "pdf" },
  { id: "gallery-peer-review", title: "Peer Review: Imus Heritage District", category: "Reflections", pdf: "/pdf/PEER_REVIEW_A58.pdf", preview: "/previews/PEER_REVIEW_A58_thumb.png", type: "pdf" }
];

export function getGalleryGroups() {
  const groups = {};
  for (let i = 0; i < galleryItems.length; i++) {
    const item = galleryItems[i];
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}
