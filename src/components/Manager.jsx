import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordArray, setPasswordArray] = useState([]);
    const [form, setForm] = useState({ site: "", username: "", password: "" });

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const togglePasswordVisibilty = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
        setForm({ site: "", username: "", password: "" });
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
       
    };

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
        toast(' Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast(' Copied To Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="min-h-screen w-screen bg-neutral-950 mx-auto my-auto text-white p-4 lg:p-8">
                <div className="container flex flex-col justify-center items-center mx-auto p-2 text-white">
                    <h1 className='text-4xl font-bold text-white text-center'>
                        <span className='text-blue-700'>&lt;</span>
                        Pass
                        <span className='text-blue-700'>Op/&gt;</span>
                    </h1>
                    <p className='font-bold text-lg text-center text-white'>Your Own Password Manager</p>

                    <div className="input-fields p-4 w-full max-w-3xl my-5 flex flex-col items-center gap-4">
                        <input
                            type="text"
                            className='rounded-full w-full border-gray-800 text-white bg-gray-800 text-center p-2 focus:bg-gray-800 focus:outline-none'
                            placeholder='Enter Website Url'
                            name='site'
                            value={form.site}
                            onChange={handleChange}
                        />
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <input
                                type="text"
                                className='rounded-full w-full md:w-1/2 border-gray-800 text-white bg-gray-800 text-center p-2 focus:bg-gray-800 focus:outline-none'
                                placeholder='Enter Username'
                                name='username'
                                value={form.username}
                                onChange={handleChange}
                            />
                            <div className="relative w-full md:w-1/2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="rounded-full w-full border-gray-800 text-white bg-gray-800 text-center p-2 pr-10 focus:bg-gray-800 focus:outline-none"
                                    placeholder="Enter Password"
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <span
                                    onClick={togglePasswordVisibilty}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer ">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        className='flex justify-center items-center bg-blue-700 rounded-full px-4 py-2 font-semibold text-white hover:bg-blue-900 transition-all'
                        onClick={savePassword}
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>

                {passwordArray.length === 0 ? (
                    <div className='text-white text-center mt-8'>No Passwords To Show</div>
                ) : (
                    <div className="passwords text-center text-white mt-8">
                        <h1 className='text-2xl font-bold text-white text-center mb-4'>
                            Your Passwords
                        </h1>
                        <table className="table-auto w-full max-w-4xl mx-auto">
                            <thead>
                                <tr>
                                    <th className='px-4 py-2'>Site</th>
                                    <th className='px-4 py-2'>Username</th>
                                    <th className='px-4 py-2'>Password</th>
                                    <th className='px-4 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center text-white'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className='py-2'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <a
                                                    href={item.site.startsWith('http') ? item.site : `http://${item.site}`}
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    className='hover:underline'
                                                >
                                                    {item.site}
                                                </a>
                                                <span className='cursor-pointer' onClick={() => copyText(item.site)}><FaCopy /></span>
                                            </div>
                                        </td>
                                        <td className='py-2'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {item.username}
                                                <span className='cursor-pointer' onClick={() => copyText(item.username)}><FaCopy /></span>
                                            </div>
                                        </td>
                                        <td className='py-2'>
                                            <div className="flex justify-center items-center gap-2">
                                                {item.password}
                                                <span className='cursor-pointer' onClick={() => copyText(item.password)}><FaCopy /></span>
                                            </div>
                                        </td>
                                        <td className='py-2'>
                                            <div className='cursor-pointer flex justify-center items-center gap-3 p-2 text-xl'>
                                                <CiEdit onClick={() => editPassword(item.id)} />
                                                <MdDeleteForever onClick={() => deletePassword(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Manager;
