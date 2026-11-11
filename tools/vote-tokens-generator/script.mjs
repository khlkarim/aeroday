import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import sharp from "sharp";

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = process.env.SUPABASE_TABLE;
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "./output";

const PAGE_SIZE = 50;
const COLUMNS = 5;
const ROWS = 10;

const PAGE_WIDTH = 2480;
const PAGE_HEIGHT = 3508;

const QR_SIZE = 240;
const BATCH_SIZE = 500;

if (!SUPABASE_URL || !SUPABASE_KEY || !TABLE) {
    throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getCount() {
    const count = Number(process.argv[2]);

    if (!Number.isSafeInteger(count) || count <= 0) {
        throw new Error(
            "Usage: node index.js <number-of-uuids>"
        );
    }

    return count;
}

function generateUUIDs(count) {
    return Array.from({ length: count }, () => randomUUID());
}

async function insertUUIDs(uuids) {
    console.log(`Inserting ${uuids.length} UUIDs...`);

    for (let i = 0; i < uuids.length; i += BATCH_SIZE) {
        const batch = uuids
            .slice(i, i + BATCH_SIZE)
            .map((uuid) => ({ uuid }));

        const { error } = await supabase
            .from(TABLE)
            .insert(batch);

        if (error) {
            throw new Error(
                `Supabase insertion failed: ${error.message}`
            );
        }

        console.log(
            `Inserted ${Math.min(i + BATCH_SIZE, uuids.length)} / ${uuids.length}`
        );
    }
}

async function generateQRCode(uuid) {
    return QRCode.toBuffer("http://tunisianaeroday.tn/live/vote?token=" + uuid, {
        type: "png",
        width: QR_SIZE,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
            dark: "#000000",
            light: "#FFFFFF",
        },
    });
}

async function generatePage(uuids, pageNumber) {
    const cellWidth = PAGE_WIDTH / COLUMNS;
    const cellHeight = PAGE_HEIGHT / ROWS;

    const elements = [];

    for (let i = 0; i < uuids.length; i++) {
        const row = Math.floor(i / COLUMNS);
        const column = i % COLUMNS;

        const x = column * cellWidth + (cellWidth - QR_SIZE) / 2;
        const y = row * cellHeight + 20;

        const qrBuffer = await generateQRCode(uuids[i]);
        const base64 = qrBuffer.toString("base64");

        elements.push(`
            <image
                href="data:image/png;base64,${base64}"
                x="${x}"
                y="${y}"
                width="${QR_SIZE}"
                height="${QR_SIZE}"
            />
            <text
                x="${column * cellWidth + cellWidth / 2}"
                y="${y + QR_SIZE + 30}"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="17"
                fill="#000000"
            >${uuids[i]}</text>
        `);
    }

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="${PAGE_WIDTH}"
            height="${PAGE_HEIGHT}"
            viewBox="0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}"
        >
            <rect
                width="100%"
                height="100%"
                fill="#ffffff"
            />
            ${elements.join("\n")}
        </svg>
    `;

    const filename = `page-${String(pageNumber).padStart(3, "0")}.png`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    await sharp(Buffer.from(svg))
        .png()
        .withMetadata({ density: 300 })
        .toFile(outputPath);

    console.log(`Generated ${outputPath}`);
}

async function generatePages(uuids) {
    const pageCount = Math.ceil(uuids.length / PAGE_SIZE);

    console.log(`Generating ${pageCount} A4 pages...`);

    await mkdir(OUTPUT_DIR, { recursive: true });

    for (let i = 0; i < pageCount; i++) {
        const pageUUIDs = uuids.slice(
            i * PAGE_SIZE,
            (i + 1) * PAGE_SIZE
        );

        await generatePage(pageUUIDs, i + 1);
    }
}

async function main() {
    const count = getCount();

    console.log(`Generating ${count} UUIDs...`);

    const uuids = generateUUIDs(count);

    await insertUUIDs(uuids);
    await generatePages(uuids);

    console.log("\nGeneration completed successfully!");
    console.log(`UUIDs generated: ${count}`);
    console.log(`Pages generated: ${Math.ceil(count / PAGE_SIZE)}`);
    console.log(`Images saved in: ${OUTPUT_DIR}`);
}

main().catch((error) => {
    console.error("\nError:", error.message);
    process.exitCode = 1;
});
