import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
    const [form, setForm] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("/blog/create", form);
            navigate("/blogs");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to create blog");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                Create Blog
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-300"
                >
                    Create
                </button>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
    );
}

export default BlogCreate;
