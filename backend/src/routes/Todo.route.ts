import express from "express";
import {
  createTodo,
  getAllTodos, 
  deleteTodoById,
  updateTodoById,
  getTodoStats,
  bulkUpdateTodos,
  bulkDeleteTodos
} from "../controllers/Todos.controller";

const router = express.Router();

router.post("/create", createTodo);
router.get("/all", getAllTodos);
router.get("/stats", getTodoStats);
router.delete("/delete/:id", deleteTodoById);
router.put("/update/:id", updateTodoById);
router.put("/bulk-update", bulkUpdateTodos);
router.delete("/bulk-delete", bulkDeleteTodos);

export default router;