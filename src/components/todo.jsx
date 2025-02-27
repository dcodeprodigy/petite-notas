import React from "react";

const ToDoList = ({ todos = [] }) => {
    return (
        <>
        {todos.map((todo) => {
            (
                <>
                <li key={todo.id}>
                    <input type="checkbox" id={todo.id} name={todo.id} className="rounded-sm w-4" />
                    <label htmlFor={todo.id}>{todo.name}</label>
                </li>
                <div className="inline-flex">
                    <span className={`${todo.status === true ? "bg-green-500 text-gray-50" : "bg-btn-yellow text-black"} p-1`}>{todo.status}</span>
                    <span>{todo.createdAt.toLocaleString(
                        )}</span>
                </div>
                </>
            )
            })
        }
        </>
    )
}

const ToDOSection = function ({todos}) {
    return (
        <section className="flex flex-col bg-[#f1f1f1] p-5 rounded-2xl">
            <article className="bg-white rounded-2xl flex flex-row gap-4">
                <div className="flex gap-2 p-5">
                    <img />
                    <h2 className="font-bold text-xl">To-do list</h2>
                </div>
                <div>
                    <ul>
                        <ToDoList todos={todos} />
                    </ul>
                </div>
            </article>
        </section>
    )
}

export default ToDOSection;