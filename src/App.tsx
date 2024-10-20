import "./App.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTodoStore } from "./store/useTodo";
import { randomId } from "./helpers/common";
import ListComponent from "./components/list";
import Icon from "./components/icon";
import { useState } from "react";

const formSchema = z.object({
  todo: z.string().min(2, {
    message: "Work must be at least 2 characters.",
  }),
});

function App() {
  const todo = useTodoStore((state) => state.todo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const [index, setIndex] = useState<number>(0);
  const [edits, setEdits] = useState(
    Array.from({ length: todo.length }).map(() => true)
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (edits[index]) {
      const editTemp = [...edits];
      editTemp[index] = !editTemp[index];

      setEdits(editTemp);
      editTodo(index, values.todo);
      setIndex(0);
      form.reset();
      return;
    }
    addTodo(values.todo);
    form.reset();
  }

  const handleOnEdit = (index: number) => {
    const editTemp = [...edits];
    editTemp[index] = !editTemp[index];
    setEdits(editTemp);
    setIndex(index);

    form.setValue("todo", todo[index]);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid grid-cols-3 gap-6"
        >
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Your todo</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your todo" {...field} />
                </FormControl>
                <FormDescription>
                  Todo list will be created after you had clicked the submit
                  button
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <h2 className="text-2xl font-bold mt-6 mb-2">Your Todo List:</h2>
      <ul className="space-y-2">
        <ListComponent
          data={todo}
          renderItems={(item, index) => {
            return (
              <li key={randomId()} className="grid grid-cols-3">
                <p className="col-span-2">
                  {index + 1}. {item}
                </p>
                <div className="col-span-1 flex items-center">
                  {!edits[index] && (
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      disabled={edits[index]}
                      onClick={() => handleOnEdit(index)}
                    >
                      <Icon name={"pencil"} size={20} />
                    </Button>
                  )}
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="ml-4 "
                    onClick={() => {
                      removeTodo(index);
                    }}
                  >
                    <Icon name="x" size={20} />
                  </Button>
                </div>
              </li>
            );
          }}
        />
      </ul>
    </>
  );
}

export default App;
