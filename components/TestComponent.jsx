'use client'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2em;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    background-color: #fff;
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
`;

const PostTitle = styled.h2`
    font-size: 1.5em;
    color: #444;
    margin-bottom: 10px;
`;

const PostBody = styled.p`
    font-size: 1em;
    color: #666;
    line-height: 1.6;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #45a049;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const LoadingMessage = styled.p`
    color: #333;
    text-align: center;
`;

// Основной компонент
const TestComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null); // Для проверки успешного запроса

    useEffect(() => {
        // GET запрос к jsonplaceholder
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setStatus(response.status); // Проверка статуса ответа
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
        return <LoadingMessage>Загрузка...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>Ошибка: {error}</ErrorMessage>;
    }

    return (
        <Container>
            <Title>Список постов:</Title>
            {status === 200 ? (
                <List>
                    {data.map(post => (
                        <ListItem key={post.id}>
                            <PostTitle>{post.title}</PostTitle>
                            <PostBody>{post.body}</PostBody>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <ErrorMessage>Не удалось получить данные (Статус: {status})</ErrorMessage>
            )}
            <Button onClick={handlePost}>Выполнить POST запрос</Button>
            <Button onClick={handlePut}>Выполнить PUT запрос</Button>
            <Button onClick={handleDelete}>Выполнить DELETE запрос</Button>
        </Container>
    );
};

export default TestComponent;
