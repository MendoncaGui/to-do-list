import Trash from '../../assets/trash.svg';
import { Task } from '../../models/Tasks';
import Styles from './index.module.css';

interface TodoListProps{
    list: Task[];
    onDelete: (id: string) => void
    onChangeCheckbox: (id: string) => void
}

export const TodoList = ({ list, onDelete, onChangeCheckbox }:TodoListProps) =>{
    return(
        <section className={Styles.section_container}>
            {list.map((task) => (
                <article key={task.id} className={Styles.content_container}>
                    <input type="checkbox" id={task.id} onChange ={() => onChangeCheckbox(task.id)}  defaultChecked={task.isDone}/>
                    <p className={task.isDone ? Styles.text_scratched : Styles.text}>{task.description}</p>
                    <img className={Styles.img} src={Trash} alt="Ícone de lixeira" onClick={() => onDelete(task.id)} />
                </article>
            ))}
        </section>
    )
}