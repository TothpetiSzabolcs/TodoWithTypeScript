import { toast } from "sonner";
import { TodoFormData } from "../components/left-sidebar/CreatingForm";

export const getAllTodo = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/all");

    if (!res.ok) {
      throw new Error("Error fetching todos");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Todos", error);
    toast.error("Error getting Todos");
  }
};

export const createTodo = async (data: TodoFormData) => {
  try {
    const res = await fetch("http://localhost:8080/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error communicating with the server");
    }
    toast.success("Succesfully created new Todo");
    return await res.json();
  } catch (error) {
    console.error("Error creating new Todo", error);
    toast.error("Error creating new Todo");
  }
};

export const updateTodo = async (id: string, todo: TodoFormData) => {
  try {
    const res = await fetch(`http://localhost:8080/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });

    if (!res.ok) {
      throw new Error("Error updating Todo");
    }
    toast.success("Succesfully updated Todo");
    return await res.json();
  } catch (error) {
    console.error("Update error", error);
    toast.error("Error updating Todo");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:8080/api/delete/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Error deleting Todo");
    }

    toast.success("Todo succesfully deleted");
    return await res.json();
  } catch (error) {
    toast.error("Failed to delete");
    console.error("Update error", error);
  }
};
