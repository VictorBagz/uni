
import initSqlJs from 'sql.js';
import { HOSTELS, NEWS_ITEMS, EVENTS, JOBS, ROOMMATE_PROFILES } from '../constants';

let dbPromise;

const createSchema = (db) => {
    db.run(`
        CREATE TABLE hostels (
            id TEXT PRIMARY KEY,
            name TEXT,
            location TEXT,
            priceRange TEXT,
            imageUrl TEXT,
            rating REAL,
            universityId TEXT,
            description TEXT,
            amenities TEXT,
            isRecommended BOOLEAN
        );
        CREATE TABLE news (
            id TEXT PRIMARY KEY,
            title TEXT,
            description TEXT,
            imageUrl TEXT,
            source TEXT
        );
        CREATE TABLE events (
            id TEXT PRIMARY KEY,
            title TEXT,
            date TEXT,
            day TEXT,
            month TEXT,
            location TEXT,
            imageUrl TEXT
        );
        CREATE TABLE jobs (
            id TEXT PRIMARY KEY,
            title TEXT,
            deadline TEXT,
            company TEXT,
            imageUrl TEXT,
            location TEXT,
            type TEXT,
            description TEXT,
            responsibilities TEXT,
            qualifications TEXT,
            howToApply TEXT
        );
        CREATE TABLE roommate_profiles (
            id TEXT PRIMARY KEY,
            name TEXT,
            imageUrl TEXT,
            age INTEGER,
            gender TEXT,
            universityId TEXT,
            course TEXT,
            yearOfStudy INTEGER,
            budget REAL,
            moveInDate TEXT,
            leaseDuration TEXT,
            bio TEXT,
            isSmoker BOOLEAN,
            drinksAlcohol TEXT,
            studySchedule TEXT,
            cleanliness TEXT,
            guestFrequency TEXT,
            hobbies TEXT,
            seekingGender TEXT
        );
    `);
};

const seedDatabase = (db) => {
    // Seed Hostels
    const hostelStmt = db.prepare("INSERT INTO hostels VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    HOSTELS.forEach(h => hostelStmt.run([h.id, h.name, h.location, h.priceRange, h.imageUrl, h.rating, h.universityId, h.description, JSON.stringify(h.amenities), h.isRecommended]));
    hostelStmt.free();

    // Seed News
    const newsStmt = db.prepare("INSERT INTO news VALUES (?, ?, ?, ?, ?)");
    NEWS_ITEMS.forEach(n => newsStmt.run([n.id, n.title, n.description, n.imageUrl, n.source]));
    newsStmt.free();

    // Seed Events
    const eventStmt = db.prepare("INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?)");
    EVENTS.forEach(e => eventStmt.run([e.id, e.title, e.date, e.day, e.month, e.location, e.imageUrl]));
    eventStmt.free();

    // Seed Jobs
    const jobStmt = db.prepare("INSERT INTO jobs VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    JOBS.forEach(j => jobStmt.run([j.id, j.title, j.deadline, j.company, j.imageUrl, j.location, j.type, j.description, JSON.stringify(j.responsibilities), JSON.stringify(j.qualifications), j.howToApply]));
    jobStmt.free();

    // Seed Roommate Profiles
    const profileStmt = db.prepare("INSERT INTO roommate_profiles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    ROOMMATE_PROFILES.forEach(p => profileStmt.run([p.id, p.name, p.imageUrl, p.age, p.gender, p.universityId, p.course, p.yearOfStudy, p.budget, p.moveInDate, p.leaseDuration, p.bio, p.isSmoker, p.drinksAlcohol, p.studySchedule, p.cleanliness, p.guestFrequency, p.hobbies, p.seekingGender]));
    profileStmt.free();
};


export const getDb = () => {
    if (!dbPromise) {
        dbPromise = (async () => {
            try {
                // Explicitly fetch the wasm file to avoid fs errors in certain environments.
                const wasmUrl = 'https://esm.sh/sql.js@^1.11.0/dist/sql-wasm.wasm';
                const wasmBinary = await fetch(wasmUrl).then(res => res.arrayBuffer());

                const SQL = await initSqlJs({ wasmBinary });
                const db = new SQL.Database();
                createSchema(db);
                seedDatabase(db);
                return db;
            } catch (err) {
                console.error("Database initialization failed:", err);
                throw err;
            }
        })();
    }
    return dbPromise;
};
