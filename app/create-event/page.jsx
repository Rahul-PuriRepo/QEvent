"use client"; 
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react"; 

export default function CreateEventPage() 
{ 
        const { data: session, status } = useSession(); 
        const [loading, setLoading] = useState(false);
        const router = useRouter(); 
        const [form, setForm] = useState({ name: "", location: "", artist: "", date: "", time: "", price: "", image: "", description: "", tags:"", }); 
        useEffect(() => { 
            if (status === "loading") 
                return; 
            if (!session) 
            { 
                router.push("/events"); 
            } 
        }, [session, status]); 
        if (!session) 
            return null; 
        const handleChange = (e) => { 
            setForm({ ...form, [e.target.name]: e.target.value }); 
        }; 
        const handleSubmit = async (e) => { 
            e.preventDefault(); 
            // if (!form.name.trim() || !form.location.trim() || !form.date) 
            // { 
            //     alert("Please fill required fields"); 
            //     return; 
            // } 
            const payload = {
  name: form.name,
  location: form.location,
  artist: form.artist,
  description: form.description,
  image: form.image || "https://picsum.photos/400/200",
  price: Number(form.price) || 0,
  date: form.time
    ? new Date(`${form.date}T${form.time}`).toISOString()
    : new Date(form.date).toISOString(),
  tags: form.tags
    ? form.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
    : [],
}; 
                setLoading(true);
                try { 
                    const res = await fetch( "https://qevent-backend.labs.crio.do/events", 
                        { method: "POST", headers: { "Content-Type": "application/json", }, 
                        body: JSON.stringify(payload), } ); 
                    if (!res.ok) 
                    { 
                        throw new Error("Failed to create event"); 
                    } 
                    const data = await res.json(); 
                    console.log("Created:", data); 
                    // redirect after success 
                    router.push("/events"); 
                } 
                catch (err) { 
                    console.error(err); 
                }
                finally {
                    setLoading(false);
                }
        }; 
        return ( 
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6"> 
        <h1 className="text-2xl font-bold mb-4">Create Event</h1> 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
            <input required disabled={loading} name="name" placeholder="Event Name" onChange={handleChange} 
            className="border p-2 rounded" /> 
            <input required disabled={loading} name="location" placeholder="Location" onChange={handleChange} 
            className="border p-2 rounded" /> 
            <input disabled={loading} name="artist" placeholder="Artist" onChange={handleChange} 
            className="border p-2 rounded" />
            <input disabled={loading} name="tags" placeholder="Tags (comma separated)" onChange={handleChange} 
            className="border p-2 rounded" />
            <input required disabled={loading} type="date" name="date" onChange={handleChange} 
            className="border p-2 rounded" /> <input disabled={loading} type="time" name="time" 
            onChange={handleChange} className="border p-2 rounded" /> 
            <input disabled={loading} name="price" placeholder="Price" onChange={handleChange} 
            className="border p-2 rounded" /> 
            <input disabled={loading} name="image" placeholder="Image URL" onChange={handleChange} 
            className="border p-2 rounded" /> 
            <textarea disabled={loading} name="description" placeholder="Description" onChange={handleChange} 
            className="border p-2 rounded" /> 
            <button
  disabled={loading}
  className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-50"
>
  {loading ? "Creating..." : "Create Event"}
</button> 
        </form> 
    </div> );
     }