import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

import { productVariants } from "../src/data/products.js";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const templatePath = resolve(dist, "index.html");

function productionOrigin() {
    const configured = process.env.VITE_SITE_URL?.trim();
    const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    const vercelDeployment = process.env.VERCEL_URL?.trim();
    const raw = configured || vercelProduction || vercelDeployment || "http://localhost:4173";
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return withProtocol.replace(/\/+$/, "");
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function imageFormat(bytes, fallbackExtension) {
    if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return { extension: "jpg", mime: "image/jpeg" };
    if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { extension: "png", mime: "image/png" };
    if (bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP") {
        return { extension: "webp", mime: "image/webp" };
    }
    const extension = fallbackExtension.replace(/^\./, "").toLowerCase() || "jpg";
    return { extension, mime: extension === "png" ? "image/png" : "image/jpeg" };
}

function socialBlock({ title, description, url, image, imageMime, imageAlt, type = "website" }) {
    const values = Object.fromEntries(
        Object.entries({ title, description, url, image, imageMime, imageAlt, type })
            .map(([key, value]) => [key, escapeHtml(value)])
    );

    return `<!-- social-meta:start -->
    <meta name="description" content="${values.description}" />
    <meta property="og:type" content="${values.type}" />
    <meta property="og:locale" content="es_AR" />
    <meta property="og:site_name" content="Químicas King" />
    <meta property="og:title" content="${values.title}" />
    <meta property="og:description" content="${values.description}" />
    <meta property="og:url" content="${values.url}" />
    <meta property="og:image" content="${values.image}" />
    <meta property="og:image:secure_url" content="${values.image}" />
    <meta property="og:image:type" content="${values.imageMime}" />
    <meta property="og:image:alt" content="${values.imageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${values.title}" />
    <meta name="twitter:description" content="${values.description}" />
    <meta name="twitter:image" content="${values.image}" />
    <link rel="canonical" href="${values.url}" />
    <!-- social-meta:end -->`;
}

function renderPage(template, metadata) {
    return template
        .replace(/<!-- social-meta:start -->[\s\S]*?<!-- social-meta:end -->/, socialBlock(metadata))
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
}

const origin = productionOrigin();
const template = await readFile(templatePath, "utf8");

const generalMetadata = {
    title: "Químicas King | Productos de limpieza mayorista",
    description: "Productos de limpieza para hogares, comercios e industrias. Envíos a todo el país.",
    url: `${origin}/`,
    image: `${origin}/logo.png`,
    imageMime: "image/png",
    imageAlt: "Logo de Químicas King"
};

await writeFile(templatePath, renderPage(template, generalMetadata), "utf8");

const socialImageDir = resolve(dist, "social", "products");
await mkdir(socialImageDir, { recursive: true });
const missingImages = [];

for (const product of productVariants) {
    const slug = String(product.slug);
    const sourceRelativePath = product.image.replace(/^\/+/, "");
    const sourcePath = resolve(root, "public", sourceRelativePath);
    let image = `${origin}/logo.png`;
    let imageMime = "image/png";

    try {
        const bytes = await readFile(sourcePath);
        const format = imageFormat(bytes, extname(sourcePath));
        const socialImageName = `${encodeURIComponent(slug)}.${format.extension}`;
        await copyFile(sourcePath, resolve(socialImageDir, socialImageName));
        image = `${origin}/social/products/${socialImageName}`;
        imageMime = format.mime;
    } catch (error) {
        if (error?.code !== "ENOENT") throw error;
        missingImages.push(sourceRelativePath);
    }

    const pageUrl = `${origin}/producto/${encodeURIComponent(slug)}`;
    const productDescription = [product.description, product.price ? `Precio: ${product.price}.` : ""]
        .filter(Boolean)
        .join(" ")
        .slice(0, 200);
    const metadata = {
        title: `${product.name} | Químicas King`,
        description: productDescription,
        url: pageUrl,
        image,
        imageMime,
        imageAlt: product.name,
        type: "product"
    };
    const productDir = resolve(dist, "producto", slug);
    await mkdir(productDir, { recursive: true });
    await writeFile(resolve(productDir, "index.html"), renderPage(template, metadata), "utf8");
}

console.log(`Generated social metadata for the site and ${productVariants.length} product pages (${origin}).`);
if (missingImages.length) {
    console.warn(`Used the site logo for ${missingImages.length} missing product image(s): ${missingImages.join(", ")}`);
}
