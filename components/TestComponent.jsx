'use client'

import React, { useEffect, useState } from 'react';

const TestComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [postId, setPostId] = useState('');
    const [singlePost, setSinglePost] = useState(null);

    useEffect(() => {
        // GET запрос для получения всех постов
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setStatus(response.status);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Функция для поиска поста по ID
    const handleFetchPostById = () => {
        if (postId === '') {
            alert('Введите ID поста');
            return;
        }

        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Пост не найден');
                }
                return response.json();
            })
            .then(post => {
                setData(null);
                setSinglePost(post);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    // POST запрос
    const handlePost = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                alert('POST запрос выполнен успешно');
                console.log(data);
            });
    };

    // PUT запрос
    const handlePut = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'updated title',
                body: 'updated body',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                alert('PUT запрос выполнен успешно');
                console.log(data);
            });
    };

    // DELETE запрос
    const handleDelete = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('DELETE запрос выполнен успешно');
                }
            });
    };

    if (loading) {
        return <p className="text-center text-gray-500">Загрузка...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Ошибка: {error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Список постов</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Введите ID поста" 
                    className="border p-2 rounded-md w-full md:w-auto flex-grow"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                />
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleFetchPostById}
                >
                    Найти пост по ID
                </button>
            </div>

            {singlePost && (
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold">{singlePost.title}</h2>
                    <p className="text-gray-700">{singlePost.body}</p>
                </div>
            )}

            {status === 200 ? (
                <ul className="space-y-4">
                    {data && data.map(post => (
                        <li key={post.id} className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-600">{post.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-red-500">Не удалось получить данные (Статус: {status})</p>
            )}

            <div className="flex justify-center gap-4 mt-6">
                <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    onClick={handlePost}
                >
                    POST запрос
                </button>
                <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                    onClick={handlePut}
                >
                    PUT запрос
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={handleDelete}
                >
                    DELETE запрос
                </button>
            </div>
        </div>
    );
};

export default TestComponent;
