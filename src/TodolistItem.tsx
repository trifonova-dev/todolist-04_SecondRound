import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'

type Props = {
    title: string
    filter: FilterValues
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTasksStatus: (taskId: Task["id"], isDone: Task["isDone"]) => void
}

export const TodolistItem = ({
                                 title,
                                 filter,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTasksStatus,
                             }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const createTaskHandler = () => {
        const trimmedTasks = taskTitle.trim()
        if (trimmedTasks) {
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
                    <div style={{color: error ? "red" : "inherit"}}>Enter title and press button</div>}
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
                                    onChange={(e) => changeTasksStatus(task.id, e.currentTarget.checked)}
                                />
                                <span
                                    className={task.isDone ? "task-done" : "task"}
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
                    onClick={() => changeFilter('all')}
                    className={filter === 'all' ? "btn-active" : ""}
                />
                <Button
                    title={'Active'}
                    onClick={() => changeFilter('active')}
                    className={filter === 'active' ? "btn-active" : ""}
                />
                <Button
                    title={'Completed'}
                    onClick={() => changeFilter('completed')}
                    className={filter === 'completed' ? "btn-active" : ""}
                />
            </div>
        </div>
    )
}
