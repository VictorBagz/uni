import { getDb } from './sqliteService';
import { Hostel, NewsItem, Event, Job, RoommateProfile } from '../types';

// Helper to convert SQL query results to an array of objects
function mapSqlResult<T>(result: any[]): T[] {
    if (!result || result.length === 0) {
        return [];
    }
    const { columns, values } = result[0];
    return values.map(row => {
        const obj = {};
        columns.forEach((col, index) => {
            obj[col] = row[index];
        });
        return obj as T;
    });
}

// Helper to deserialize fields that are stored as JSON strings
const deserialize = <T>(items: any[], jsonFields: string[]): T[] => {
    return items.map(item => {
        const deserializedItem = { ...item };
        jsonFields.forEach(field => {
            if (typeof deserializedItem[field] === 'string') {
                try {
                    deserializedItem[field] = JSON.parse(deserializedItem[field]);
                } catch (e) {
                    console.error(`Failed to parse JSON for field ${field}`, e);
                    deserializedItem[field] = [];
                }
            }
        });
        // Also handle boolean conversion from 0/1
        if (deserializedItem.isRecommended !== undefined) {
             deserializedItem.isRecommended = !!deserializedItem.isRecommended;
        }
         if (deserializedItem.isSmoker !== undefined) {
             deserializedItem.isSmoker = !!deserializedItem.isSmoker;
        }
        return deserializedItem;
    });
}

// Generic CRUD factory for the SQLite database
const createCrudService = <T extends { id: string }>(tableName: string, jsonFields: string[] = []) => {
    return {
        async getAll(): Promise<T[]> {
            const db = await getDb();
            const res = db.exec(`SELECT * FROM ${tableName}`);
            const items = mapSqlResult<any>(res);
            return deserialize<T>(items, jsonFields);
        },

        async add(item: Omit<T, 'id'>): Promise<T> {
            const db = await getDb();
            const id = `${tableName.slice(0, -1)}-${Date.now()}`;
            const newItem = { ...item, id };

            const columns = Object.keys(newItem);
            const placeholders = columns.map(() => '?').join(',');
            const values = Object.values(newItem).map(v => Array.isArray(v) || typeof v === 'object' ? JSON.stringify(v) : v);
            
            db.run(`INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${placeholders})`, values);
            return newItem as T;
        },

        async update(id: string, item: Partial<Omit<T, 'id'>>): Promise<void> {
            const db = await getDb();
            const setClauses = Object.keys(item).map(key => `${key} = ?`).join(', ');
            const values = Object.values(item).map(v => Array.isArray(v) || typeof v === 'object' ? JSON.stringify(v) : v);
            
            db.run(`UPDATE ${tableName} SET ${setClauses} WHERE id = ?`, [...values, id]);
        },

        // For roommate profiles, which are "set" rather than added/updated separately
        async set(item: T): Promise<void> {
            const db = await getDb();
            const columns = Object.keys(item);
            const values = Object.values(item).map(v => Array.isArray(v) || typeof v === 'object' ? JSON.stringify(v) : v);
            
            const updateClauses = columns.filter(c => c !== 'id').map(c => `${c} = excluded.${c}`).join(', ');

            const query = `
                INSERT INTO ${tableName} (${columns.join(',')})
                VALUES (${columns.map(() => '?').join(',')})
                ON CONFLICT(id) DO UPDATE SET ${updateClauses};
            `;
            db.run(query, values);
        },

        async remove(id: string): Promise<void> {
            const db = await getDb();
            db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        },
    };
};

export const hostelService = createCrudService<Hostel>('hostels', ['amenities']);
export const newsService = createCrudService<NewsItem>('news');
export const eventService = createCrudService<Event>('events');
export const jobService = createCrudService<Job>('jobs', ['responsibilities', 'qualifications']);
export const roommateProfileService = createCrudService<RoommateProfile>('roommate_profiles');
export const initDb = async () => { await getDb(); }; // Expose init function

// Create handlers compatible with the AdminDashboard
const createAdaptedCrudHandler = (service) => ({
    add: async (item) => { await service.add(item); },
    update: async (item) => { await service.update(item.id, item); },
    remove: async (id) => { await service.remove(id); },
});

export const hostelHandler = createAdaptedCrudHandler(hostelService);
export const newsHandler = createAdaptedCrudHandler(newsService);
export const eventHandler = createAdaptedCrudHandler(eventService);
export const jobHandler = createAdaptedCrudHandler(jobService);