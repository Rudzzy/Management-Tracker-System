import React, { useState } from 'react';
import Modal from '../common/Modal';
import { createRequest } from '../../api/requestApi';
import { getEquipmentList } from '../../api/equipement';

const CreateRequestModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        subject: '',
        request_type: 'repair',
        priority: 'medium',
        description: '',
        equipment_id: '',
    });
    const [equipmentList, setEquipmentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await getEquipmentList();
                setEquipmentList(res.data);
            } catch (err) {
                console.error("Failed to fetch equipment:", err);
            }
        };
        if (isOpen) {
            fetchEquipment();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createRequest(formData);
            onSuccess();
            onClose();
            setFormData({
                subject: '',
                request_type: 'repair',
                priority: 'medium',
                description: '',
                equipment_id: '',
            });
        } catch (err) {
            setError('Failed to create request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="New Maintanance Request">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="E.g., CNC Machine Backup"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Equipment</label>
                    <select
                        name="equipment_id"
                        value={formData.equipment_id}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Equipment</option>
                        {equipmentList.map((eq) => (
                            <option key={eq._id} value={eq._id}>
                                {eq.equipment_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                        <select
                            name="request_type"
                            value={formData.request_type}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="repair">Repair</option>
                            <option value="routine">Routine Maintenance</option>
                            <option value="inspection">Inspection</option>
                            <option value="breakdown">Breakdown</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Describe the issue in detail..."
                    />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Request'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateRequestModal;
