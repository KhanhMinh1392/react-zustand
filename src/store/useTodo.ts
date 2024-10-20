import { create } from "zustand";

type State = {
  todo: string[];
};

type Action = {
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
  editTodo: (index: number, newTodo: string) => void;
  setTodo: (todo: string[]) => void;
};

export const useTodoStore = create<State & Action>((set) => ({
  todo: [],
  addTodo: (todo) =>
    set((state) => ({ ...state, todo: [...state.todo, todo] })),
  removeTodo(index) {
    set((state) => ({
      ...state,
      todo: [...state.todo.slice(0, index), ...state.todo.slice(index + 1)],
    }));
  },
  editTodo(index, newTodo) {
    set((state) => ({
      ...state,
      todo: state.todo.map((t, i) => (i === index ? newTodo : t)),
    }));
  },
  setTodo(todo) {
    set((state) => ({ ...state, todo }));
  },
}));
