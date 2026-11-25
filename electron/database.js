
const fs = require("fs/promises");
const path = require("path");

/**
 * สร้าง Database URL สำหรับ Prisma 5
 */
function createDatabaseUrl(databasePath) {
    const normalizedPath = path
        .resolve(databasePath)
        .replace(/\\/g, "/");

    return `file:${normalizedPath}`;
}

/**
 * หา Database เดิม
 */
function getLegacyDatabasePath(app) {
    if (app.isPackaged) {
        // ฐานข้อมูลที่ electron-builder
        // copy ไปยัง resources/database
        return path.join(
            process.resourcesPath,
            "database",
            "app.db"
        );
    }

    // Development mode
    return path.join(
        app.getAppPath(),
        "database",
        "app.db"
    );
}

/**
 * ตรวจสอบว่าไฟล์มีอยู่หรือไม่
 */
async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * Migration Database
 */
async function migrateDatabase(sourcePath, targetPath, backupDir) {

    // ถ้ามี Database ใน AppData แล้ว ห้ามเขียนทับ
    if (await fileExists(targetPath)) {
        console.log("Database already exists:", targetPath);

        return {
            migrated: false,
            reason: "database_already_exists"
        };
    }

    // ไม่มีฐานข้อมูลเดิม เช่น การติดตั้งครั้งแรก
    if (!(await fileExists(sourcePath))) {
        console.log("Legacy database not found.");

        return {
            migrated: false,
            reason: "legacy_database_not_found"
        };
    }

    await fs.mkdir(path.dirname(targetPath), {
        recursive: true
    });

    await fs.mkdir(backupDir, {
        recursive: true
    });

    // สำรองฐานข้อมูลก่อน Migration
    const backupPath = path.join(
        backupDir,
        `app-before-migration-${Date.now()}.db`
    );

    await fs.copyFile(sourcePath, backupPath);

    // คัดลอก WAL ด้วย หากมี
    const sourceWal = `${sourcePath}-wal`;
    const targetWal = `${targetPath}-wal`;

    if (await fileExists(sourceWal)) {
        await fs.copyFile(
            sourceWal,
            `${backupPath}-wal`
        );
    }

    // คัดลอกไฟล์ไปยังไฟล์ชั่วคราวก่อน
    const tempPath = `${targetPath}.migrating`;

    await fs.copyFile(sourcePath, tempPath);

    if (await fileExists(sourceWal)) {
        await fs.copyFile(
            sourceWal,
            `${tempPath}-wal`
        );
    }

    // เปลี่ยนชื่อไฟล์หลักหลังคัดลอกเสร็จ
    await fs.rename(tempPath, targetPath);

    // เปลี่ยนชื่อ WAL ให้ตรงกับฐานข้อมูลใหม่
    if (await fileExists(`${tempPath}-wal`)) {
        await fs.rename(
            `${tempPath}-wal`,
            targetWal
        );
    }

    console.log("Database migration completed.");

    return {
        migrated: true,
        backupPath
    };
}

/**
 * เตรียม Database ก่อนเริ่ม Next.js
 */
async function prepareDatabase(app) {

    // ใช้ AppData ของ Windows
    const appDataPath = path.join(
        app.getPath("appData"),
        "parking-pos"
    );

    // กำหนด userData ให้เป็นตำแหน่งเดียวกันเสมอ
    app.setPath("userData", appDataPath);

    const databasePath = path.join(
        app.getPath("userData"),
        "app.db"
    );

    const backupDir = path.join(
        app.getPath("userData"),
        "backups"
    );

    const legacyPath = getLegacyDatabasePath(app);

    const migrationResult = await migrateDatabase(
        legacyPath,
        databasePath,
        backupDir
    );

    // กำหนดก่อนเริ่ม Next.js Server
    const databaseUrl = createDatabaseUrl(databasePath);

    process.env.DATABASE_URL = databaseUrl;

    console.log("Database path:", databasePath);
    console.log("Migration result:", migrationResult);

    return {
        databasePath,
        databaseUrl,
        migrationResult
    };
}

module.exports = {
    prepareDatabase
};
