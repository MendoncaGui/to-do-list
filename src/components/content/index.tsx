import styles from './index.module.css'
import Plus from '../../assets/plus.svg'
import { NoContent } from '../NoContent'
import {ChangeEvent , useEffect, useState} from 'react';
import { TodoList } from '../TodoList';
import { Task } from '../../models/Tasks';
import {v4 as uuidv4} from 'uuid';
import { api } from '../../configs/database/api';



export const Content = () => {
    const [description, setDescription] = useState<string>("");


    const [tasksList,setTasksList] = useState<Task[]>([]);

    const tasksDone = tasksList.filter((task) => {
        return task.isDone! !== false;
    })

    const disabledButton = !description.length;

    const addTaskOnList = () => {
        const newTask = {
            id: uuidv4(),
            description,
            isDone: false,
        }
        
        api.post("tasks",  newTask).then((response) => setTasksList((currentValue) => [...currentValue, response.data])).finally(() =>  setDescription(''));
       
    }

    const removeTaskOnList = (id:string) => {
         api.delete(`tasks/${id}`).then(() => setTasksList((currentValue) => currentValue.filter(task => task.id !== id)));
    }

    const changeStatusCheckbox = (id: string) => {
        const task = tasksList.find(task => task.id == id);

        if(task){
            api.patch(`tasks/${id}`, {isDone: !task.isDone});
        }

        const elements = tasksList.map((task) =>{
            if(task.id == id){
                return { 
                    ...task,
                    isDone: !task.isDone
                 }
            }
            return task; 
        });

        setTasksList(elements);
    }

    useEffect(() => {
        api.get("tasks").then((response) => setTasksList(response.data as Task[]));
    } , []);

    return (
       <section className={styles.section_container}>
            <main>
                <article className={styles.input_container}>
                    <input className={styles.input} type="text" value={description} placeholder="Adicione uma nova tarefa" onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />
                    <button className={styles.button} disabled={disabledButton} onClick={() => addTaskOnList()} >Criar
                        <img src={Plus} alt="Ícone de mais" />
                    </button>
                </article>
                <article className={styles.content_header}>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_created}>Tarefas Criadas</p>
                        <span className={styles.span_value}>{tasksList.length}</span>
                    </article>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_done}>Concluídas</p>
                        <span className={styles.span_value}>{tasksDone.length} de {tasksList.length}</span>
                    </article>
                </article> 
                
                {tasksList.length == 0 ? <NoContent/> :  <TodoList onDelete={removeTaskOnList} onChangeCheckbox={changeStatusCheckbox} list={tasksList}/>}
                
            </main>
       </section>
    )
}