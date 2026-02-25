// Cloudinary Base URL with SEO Suffix (Helps scrapers and indexers identify the brand in the URL)
const SEO_SUFFIX = "dentocare-dr-nimisha-modi-surat-plusdentocare";
const SEO_IMG = (url, width = 1200) => {
    // Check if it's already a Cloudinary URL or a raw URL
    if (url.includes('res.cloudinary.com')) {
        // Replace /upload/ with /upload/w_{width},f_auto,q_auto/ if not already present
        const transformed = url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
        return `${transformed}${transformed.includes('?') ? '&' : '?'}seo=${SEO_SUFFIX}`;
    }
    return `${url}?seo=${SEO_SUFFIX}`;
};

export const IMAGES = {
    // Brand
    logo: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732052/logo_cgdtgo.png", 300),
    doctor: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732039/doctor_hi4dox.png", 800),

    // Core Backgrounds
    hero: SEO_IMG(`https://res.cloudinary.com/dyc1drqpy/image/upload/v1768731991/dent3_vp24y8.png`, 1200),
    clinic: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    safety: "https://images.unsplash.com/photo-1584036561566-b93a941cd64e?q=80&w=1974&auto=format&fit=crop",

    // Why Choose Section Images
    whyChoose: [
        SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768734850/dr-nimisha-modi-palanpur-patia-surat-dentists-l8zz3a59je_glhdvx.jpg"),
        SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736707/-6o48ecgfmp-250_j0uvqw.jpg"),
        SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732155/dr-nimisha-modi-palanpur-patia-surat-dentists-s2hw4zs0aa_kn395q.avif"),
        SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732143/dr-nimisha-modi-palanpur-patia-surat-dentists-y5jv3ezypp_siu6kx.avif")
    ],

    // Slides (Cloudinary)
    slides: {
        slide1: SEO_IMG(`https://res.cloudinary.com/dyc1drqpy/image/upload/v1768734665/doctor_sr6xdx.png`, 1200),
        slide2: SEO_IMG(`https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732134/dr-nimisha-modi-palanpur-patia-surat-dentists-148265lk6v_ru0ksy.avif`, 800),
        slide3: SEO_IMG(`https://res.cloudinary.com/dyc1drqpy/image/upload/v1768731991/dent3_vp24y8.png`, 800),
        slide4: SEO_IMG(`https://res.cloudinary.com/dyc1drqpy/image/upload/v1768732043/slide3_fvcvc2.png`, 800)
    },

    // Gallery / Showcase Defaults
    showcase: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000",
        "https://images.unsplash.com/photo-1584036561566-b93a941cd64e?q=80&w=1000",
        "https://cdn.pixabay.com/photo/2013/02/09/04/30/dentist-80183_1280.jpg",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000",
    ],

    gallery: [
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736713/dr-nimisha-modi-palanpur-patia-surat-dentists-blgy5phmkk_jxcara.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736712/jd-Ott_720x540_Thumbnail.0000001_okocv7.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736712/jd-Ott_720x540_Thumbnail.0000009_mcjsma.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736711/dr-nimisha-modi-palanpur-patia-surat-dentists-e3jw4n1nbv_ecvyod.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736711/dr-nimisha-modi-palanpur-patia-surat-dentists-cftk0g49bx_ebwyx6.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736711/dr-nimisha-modi-dent-o-care-palanpur-patia-surat-dentists-qvmx9lfhbx_cebqul.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736710/dent-o-care-advanced-multispeciality-dental-clinic-and-implant_8_m0ijph.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736709/dent-o-care-advanced-multispeciality-dental-clinic-and-implant_7_mlqum4.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736709/dent-o-care-advanced-multispeciality-dental-clinic-and-implant_2_vkre09.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736708/-8931v5vy02-250_qggxhf.jpg", 400), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768736707/-6o48ecgfmp-250_j0uvqw.jpg", 400), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768734850/dr-nimisha-modi-palanpur-patia-surat-dentists-l8zz3a59je_glhdvx.jpg", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732155/dr-nimisha-modi-palanpur-patia-surat-dentists-s2hw4zs0aa_kn395q.avif", 800), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732141/dr-nimisha-modi-palanpur-patia-surat-dentists-vgsxhlwarr_vsjlqo.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732143/dr-nimisha-modi-palanpur-patia-surat-dentists-y5jv3ezypp_siu6kx.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732139/dr-nimisha-modi-palanpur-patia-surat-dentists-81n1221d3o_jf0lna.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732134/dr-nimisha-modi-palanpur-patia-surat-dentists-148265lk6v_ru0ksy.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732043/slide3_fvcvc2.png"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768731991/dr-nimisha-modi-palanpur-patia-surat-dentists-ox6ul8pgdp_kg38fo.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768731991/dent3_vp24y8.png"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768731990/dr-nimisha-modi-palanpur-patia-surat-dentists-7spwiu6rfx_upb0bw.avif"), category: "Clinic" },
        { url: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768731990/dr-nimisha-modi-palanpur-patia-surat-dentists-qxv5fbqyyn_tizivb.avif"), category: "Clinic" }
    ],

    // Treatment Specific
    treatments: {
        prosthetics: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732105/Denture_emjwhz.jpg", 600),
        restoration: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732102/Dental_crowns_pa3a3i.jpg", 600),
        extraction: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732111/wisdom_teeth_l2eg61.jpg", 600),
        rct: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732113/root_canal_kgicfn.jpg", 600),
        implants: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732107/implant_vxgxlc.jpg", 600),
        surgery: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732108/laser_Densitry_za7vep.jpg", 600),
        gum: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732082/laser_Densitry_qdhgas.jpg", 600),
        checkup: SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/f_auto,q_auto/v1768732102/clear_aligner_cu8n02.jpg", 600)
    },

    // Centralized Treatment Content
    TREATMENT_CONTENT: [
        {
            id: "prosthetics",
            name: "Prosthetics",
            subtitle: "Face & Jaw Reconstruction",
            description: "Fixed teeth and jaw repair solutions.",
            link: "/treatments#maxillofacial-prosthetics",
            imageKey: "prosthetics"
        },
        {
            id: "restoration",
            name: "Restoration",
            subtitle: "Tooth Brightening",
            description: "Brighten and restore discolored teeth.",
            link: "/treatments#restoration",
            imageKey: "restoration"
        },
        {
            id: "extraction",
            name: "Wisdom Tooth",
            subtitle: "Painless Extractions",
            description: "Painless surgical extractions of wisdom teeth.",
            link: "/treatments#extraction",
            imageKey: "extraction"
        },
        {
            id: "rct",
            name: "Root Canal",
            subtitle: "Save Natural Teeth",
            description: "Save your natural tooth expertly with painless RCT.",
            link: "/treatments#rct",
            imageKey: "rct"
        },
        {
            id: "implants",
            name: "Implants",
            subtitle: "Permanent Solution",
            description: "Permanent, natural-looking tooth replacements.",
            link: "/treatments#implants",
            imageKey: "implants"
        },
        {
            id: "surgery",
            name: "Dental Surgery",
            subtitle: "Advanced Care",
            description: "Safe surgery for difficult dental cases.",
            link: "/treatments#surgery",
            imageKey: "surgery"
        },
        {
            id: "gum",
            name: "Gum Therapy",
            subtitle: "Hygiene & Health",
            description: "Healthy gums for a healthy, lasting smile.",
            link: "/treatments",
            imageKey: "gum"
        },
        {
            id: "checkup",
            name: "Check-up",
            subtitle: "Preventive Care",
            description: "Preventive care for lifetime dental health.",
            link: "/contact",
            imageKey: "checkup"
        }
    ],

    // Testimonials
    avatars: [
        SEO_IMG("https://res.cloudinary.com/dyc1drqpy/image/upload/v1768734665/doctor_sr6xdx.png", 300),
        "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    ]
};
