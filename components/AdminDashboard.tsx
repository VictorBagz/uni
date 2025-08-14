
import React, { useState } from 'react';
import { Hostel, NewsItem, Event, Job, University } from '../types';
import Spinner from './Spinner';

// --- Helper Components ---
const Input = (props) => <input {...props} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-unistay-yellow focus:border-unistay-yellow" />;
const Textarea = (props) => <textarea {...props} rows={4} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-unistay-yellow focus:border-unistay-yellow" />;
const Select = (props) => <select {...props} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-unistay-yellow focus:border-unistay-yellow" />;

interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
}

const Button = ({ children, onClick, className = 'bg-unistay-navy text-white hover:bg-opacity-90', type = 'button', disabled = false, loading = false }: ButtonProps) => (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`px-4 py-2 font-semibold rounded-md transition-all duration-200 disabled:bg-opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}>
        {loading ? <Spinner color={className.includes('text-unistay-navy') ? 'navy' : 'white'} size="sm" /> : children}
    </button>
);

const ActionButton = ({ icon, onClick, colorClass = 'text-gray-500 hover:text-unistay-navy', loading = false }) => (
    <button onClick={onClick} disabled={loading} className={`p-1 ${colorClass} transition-colors disabled:text-gray-400 disabled:cursor-not-allowed w-6 h-6 flex items-center justify-center`}>
        {loading ? <Spinner color="navy" size="sm" /> : <i className={`fas ${icon}`}></i>}
    </button>
);

// --- Form Components ---

const NewsForm = ({ item, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState(item || { title: '', description: '', imageUrl: '', source: '' });
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
            <Input name="source" value={formData.source} onChange={handleChange} placeholder="Source" required />
            <div className="flex gap-2 justify-end">
                <Button onClick={onCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                <Button type="submit" loading={isSubmitting}>{item ? 'Update' : 'Add'} News</Button>
            </div>
        </form>
    );
};

const EventForm = ({ item, onSubmit, onCancel, isSubmitting }) => {
    const toInputDate = (dateStr) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';
    const [formData, setFormData] = useState({
        ...item,
        dateInput: toInputDate(item?.date)
    } || { title: '', dateInput: '', location: '', imageUrl: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const eventDate = new Date(`${formData.dateInput}T12:00:00`); // Avoid timezone issues
        const processedEvent = {
            ...formData,
            date: eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            day: eventDate.toLocaleDateString('en-US', { day: '2-digit' }),
            month: eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        };
        delete processedEvent.dateInput;
        onSubmit(processedEvent);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <Input name="dateInput" type="date" value={formData.dateInput} onChange={handleChange} required />
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
            <div className="flex gap-2 justify-end">
                <Button onClick={onCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                <Button type="submit" loading={isSubmitting}>{item ? 'Update' : 'Add'} Event</Button>
            </div>
        </form>
    );
};

const JobForm = ({ item, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState(item || { title: '', deadline: '', company: '', imageUrl: '' });
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <Input name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline (e.g., July 15th)" required />
            <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
            <div className="flex gap-2 justify-end">
                <Button onClick={onCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                <Button type="submit" loading={isSubmitting}>{item ? 'Update' : 'Add'} Job</Button>
            </div>
        </form>
    );
};

const HostelForm = ({ item, onSubmit, onCancel, universities, isSubmitting }) => {
    const [formData, setFormData] = useState(item || {
        name: '', location: '', priceRange: '', imageUrl: '', rating: 4.0, universityId: universities[0].id, description: '', amenities: [], isRecommended: false
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAmenityChange = (index, field, value) => {
        const newAmenities = [...formData.amenities];
        newAmenities[index][field] = value;
        setFormData({ ...formData, amenities: newAmenities });
    };

    const addAmenity = () => {
        setFormData({ ...formData, amenities: [...formData.amenities, { name: '', icon: 'fas fa-check' }] });
    };

    const removeAmenity = index => {
        const newAmenities = formData.amenities.filter((_, i) => i !== index);
        setFormData({ ...formData, amenities: newAmenities });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ ...formData, rating: parseFloat(formData.rating) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Hostel Name" required />
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
                <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <Input name="priceRange" value={formData.priceRange} onChange={handleChange} placeholder="Price Range (e.g., 800K - 1.4M)" required />
                <Input name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} placeholder="Rating" required />
                <Select name="universityId" value={formData.universityId} onChange={handleChange}>
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </Select>
            </div>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <div>
                <h4 className="font-semibold mb-2">Amenities</h4>
                <div className="space-y-2">
                    {formData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input value={amenity.name} onChange={e => handleAmenityChange(index, 'name', e.target.value)} placeholder="Amenity Name" />
                            <Input value={amenity.icon} onChange={e => handleAmenityChange(index, 'icon', e.target.value)} placeholder="Font Awesome Icon (e.g., fas fa-wifi)" />
                            <ActionButton icon="fa-trash" onClick={() => removeAmenity(index)} colorClass="text-red-500 hover:text-red-700" />
                        </div>
                    ))}
                </div>
                <Button onClick={addAmenity} className="mt-2 bg-unistay-yellow text-unistay-navy hover:bg-yellow-400"><i className="fas fa-plus mr-2"></i>Add Amenity</Button>
            </div>
            <div className="flex items-center">
                <input id="isRecommended" name="isRecommended" type="checkbox" checked={formData.isRecommended} onChange={handleChange} className="h-4 w-4 text-unistay-yellow focus:ring-unistay-yellow border-gray-300 rounded" />
                <label htmlFor="isRecommended" className="ml-2 text-sm font-medium text-gray-700">Mark as Recommended</label>
            </div>
            <div className="flex gap-2 justify-end pt-4 border-t">
                <Button onClick={onCancel} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                <Button type="submit" loading={isSubmitting}>{item ? 'Update' : 'Add'} Hostel</Button>
            </div>
        </form>
    );
};


// --- Content Manager (Generic) ---

function ContentManager({ title, items, handler, columns, FormComponent, universities = [], onDataChange }) {
    const [editingItem, setEditingItem] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsAdding(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setDeletingId(id);
            await handler.remove(id);
            onDataChange();
            setDeletingId(null);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingItem(null);
        setIsAdding(false);
    };

    const handleSubmit = async (item) => {
        setIsSubmitting(true);
        if (item.id) {
            await handler.update(item);
        } else {
            await handler.add(item);
        }
        onDataChange();
        setIsSubmitting(false);
        handleCancel();
    };

    const formProps = {
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        item: editingItem,
        isSubmitting,
        ...(universities.length > 0 && { universities }) // Conditionally add universities prop
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-unistay-navy">{title}</h2>
                <Button onClick={handleAdd} className="bg-unistay-yellow text-unistay-navy hover:bg-yellow-400" disabled={isSubmitting || deletingId !== null}>
                    <i className="fas fa-plus mr-2"></i>Add New
                </Button>
            </div>
            {(isAdding || editingItem) && <FormComponent {...formProps} />}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            {columns.map(col => <th key={col.header} className="p-4 font-semibold text-sm">{col.header}</th>)}
                            <th className="p-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                {columns.map(col => (
                                   <td key={col.accessor} className="p-4 text-sm text-gray-700 align-top">
                                       {typeof item[col.accessor] === 'boolean' ? 
                                           (item[col.accessor] ? 
                                               <span className="flex items-center justify-center"><i className="fas fa-star text-unistay-yellow"></i></span> :
                                               <span className="flex items-center justify-center"><i className="fas fa-minus text-gray-300"></i></span>) :
                                           item[col.accessor]
                                       }
                                   </td>
                                ))}
                                <td className="p-4 text-right">
                                    <div className="flex gap-3 justify-end">
                                        <ActionButton icon="fa-pencil-alt" onClick={() => handleEdit(item)} />
                                        <ActionButton icon="fa-trash" onClick={() => handleDelete(item.id)} colorClass="text-red-500 hover:text-red-700" loading={deletingId === item.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Main Dashboard Component ---

type Section = 'Hostels' | 'News' | 'Events' | 'Jobs';

const AdminDashboard = ({ onExitAdminMode, content, onDataChange }) => {
    const [activeSection, setActiveSection] = useState<Section>('Hostels');
    
    const sections = {
        Hostels: {
            title: 'Manage Hostels',
            items: content.hostels.items,
            handler: content.hostels.handler,
            columns: [
                { header: 'Name', accessor: 'name' },
                { header: 'University', accessor: 'universityId' },
                { header: 'Price Range', accessor: 'priceRange' },
                { header: 'Recommended', accessor: 'isRecommended' },
            ],
            FormComponent: HostelForm,
            universities: content.hostels.universities,
        },
        News: {
            title: 'Manage News',
            items: content.news.items,
            handler: content.news.handler,
            columns: [
                { header: 'Title', accessor: 'title' },
                { header: 'Source', accessor: 'source' },
            ],
            FormComponent: NewsForm,
        },
        Events: {
            title: 'Manage Events',
            items: content.events.items,
            handler: content.events.handler,
            columns: [
                { header: 'Title', accessor: 'title' },
                { header: 'Date', accessor: 'date' },
                { header: 'Location', accessor: 'location' },
            ],
            FormComponent: EventForm,
        },
        Jobs: {
            title: 'Manage Jobs',
            items: content.jobs.items,
            handler: content.jobs.handler,
            columns: [
                { header: 'Title', accessor: 'title' },
                { header: 'Company', accessor: 'company' },
                { header: 'Deadline', accessor: 'deadline' },
            ],
            FormComponent: JobForm,
        },
    };
    
    const icons = {
        Hostels: 'fa-hotel',
        News: 'fa-newspaper',
        Events: 'fa-calendar-alt',
        Jobs: 'fa-briefcase',
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-unistay-navy text-white flex flex-col p-4">
                <div className="text-center py-4 mb-6">
                    <h1 className="text-3xl font-extrabold">Admin</h1>
                </div>
                <nav className="flex-grow">
                    {(Object.keys(sections) as Section[]).map(section => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`w-full text-left px-4 py-3 my-1 rounded-lg transition-colors flex items-center gap-3 ${
                                activeSection === section ? 'bg-unistay-yellow text-unistay-navy font-bold' : 'hover:bg-white/10'
                            }`}
                        >
                            <i className={`fas ${icons[section]} w-5`}></i>
                            {section}
                        </button>
                    ))}
                </nav>
                <div className="pt-4 border-t border-white/20">
                    <button
                        onClick={onExitAdminMode}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                        <i className="fas fa-arrow-left w-5"></i>
                        Back to Site
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <ContentManager {...sections[activeSection]} onDataChange={onDataChange} />
            </main>
        </div>
    );
};

export default AdminDashboard;