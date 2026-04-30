import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'

type Props = {
    filter: FilterValues
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: Task["id"], isDone: Task["isDone"]) => void
}

export const TodolistItem = ({
                                 title,
                                 filter,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                             }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(taskTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       className={error ? "error" : ""}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {taskTitle.length === 0 &&
                    <div style={{color: error ? "red" : "inherit"}}>enter title and press button</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e) =>
                                        changeTaskStatus(task.id, e.currentTarget.checked)}/>
                                <span className={task.isDone ? "task_done" : "task"}
                                >{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    title={'All'}
                    className={filter === 'all' ? "filter-btn-active" : ""}
                    onClick={() => changeFilter('all')}/>
                <Button
                    title={'Active'}
                    className={filter === 'active' ? "filter-btn-active" : ""}
                    onClick={() => changeFilter('active')}/>
                <Button
                    title={'Completed'}
                    className={filter === 'completed' ? "filter-btn-active" : ""}
                    onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
