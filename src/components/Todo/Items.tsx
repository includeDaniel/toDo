import { useState } from "react";
import { Item, Todo as TodoType, useTodoType } from "../../hooks/useTodo";
import Todo from "./index";

type ItemsProps = {
    todo: TodoType;
    toggleStatus: useTodoType["toggleStatus"];
    edit: useTodoType["edit"];
    remove: useTodoType["remove"];
    clearCompleted: useTodoType["clearCompleted"];
};

const Items = ({
    todo,
    toggleStatus,
    edit,
    remove,
    clearCompleted,
}: ItemsProps) => {
    const [status, setStatus] = useState<Item["status"]>("all");
    const itemsList = todo.items.reduce((acc, curr) => {
        if (status === "all" || curr.status === status) {
            return [
                ...acc,
                <Todo.Item
                    key={curr.id}
                    toggleStatus={toggleStatus}
                    edit={edit}
                    remove={remove}
                    curr={curr}
                />,
            ];
        }
        return acc;
    }, [] as JSX.Element[]);
    return (
        <>
            <Todo.Filter
                length={todo.active}
                hasCompleted={todo.completed > 0}
                setStatus={setStatus}
                clearCompleted={clearCompleted}
            />
            <ul className="tablet:w-full cellphone:w-80 border-2 border-white list-none">
                {itemsList}
            </ul>
        </>
    );
};
export default Items;
