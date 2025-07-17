import TodoModel from "../Models/Todo.model";
import { Todo } from "../Models/Todo.model";
import { Response, Request } from "express";

type TodosResponse =
  | {
      status: "Success";
      data: Todo[] | Todo;
      total?: number;
    }
  | {
      status: "Error";
      message: string;
    };

export const createTodo = async (req: Request, res: Response) => {
  const { task, completed, category, priority, dueDate } = req.body;
  try {
    const newTodo = await TodoModel.create({
      task,
      completed,
      category,
      priority,
      dueDate
    });

    res.status(201).json({ status: "Success", data: newTodo });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const getAllTodos = async (req: Request, res: Response<TodosResponse>) => {
  try {
    const {
      search,
      category,
      priority,
      completed,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = "1",
      limit = "10"
    } = req.query;

    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$text = { $search: search as string };
    }
    
    if (category && category !== "all") {
      filter.category = category;
    }
    
    if (priority && priority !== "all") {
      filter.priority = priority;
    }
    
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const todos = await TodoModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await TodoModel.countDocuments(filter);

    res.status(200).json({ 
      status: "Success", 
      data: todos,
      total 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const getTodoStats = async (req: Request, res: Response) => {
  try {
    const totalTodos = await TodoModel.countDocuments();
    const completedTodos = await TodoModel.countDocuments({ completed: true });
    const pendingTodos = await TodoModel.countDocuments({ completed: false });
    
    // Get overdue todos
    const overdueTodos = await TodoModel.countDocuments({
      dueDate: { $lt: new Date() },
      completed: false
    });

    // Get todos by category
    const todosByCategory = await TodoModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Get todos by priority
    const todosByPriority = await TodoModel.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      status: "Success",
      data: {
        total: totalTodos,
        completed: completedTodos,
        pending: pendingTodos,
        overdue: overdueTodos,
        completionRate: totalTodos > 0 ? (completedTodos / totalTodos * 100).toFixed(1) : 0,
        byCategory: todosByCategory,
        byPriority: todosByPriority
      }
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const bulkUpdateTodos = async (req: Request, res: Response<TodosResponse>) => {
  const { ids, updates } = req.body;
  
  try {
    const result = await TodoModel.updateMany(
      { _id: { $in: ids } },
      updates
    );

    const updatedTodos = await TodoModel.find({ _id: { $in: ids } });

    res.status(200).json({ 
      status: "Success", 
      data: updatedTodos 
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const bulkDeleteTodos = async (req: Request, res: Response<TodosResponse>) => {
  const { ids } = req.body;
  
  try {
    const deletedTodos = await TodoModel.find({ _id: { $in: ids } });
    await TodoModel.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ 
      status: "Success", 
      data: deletedTodos 
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const deleteTodoById = async (req: Request, res: Response<TodosResponse>) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      return res
        .status(404)
        .json({ status: "Error", message: "Cannot find todo" });
    }

    res.status(200).json({ status: "Success", data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

export const updateTodoById = async (req: Request, res: Response<TodosResponse>) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
      return res
        .status(404)
        .json({ status: "Error", message: "Cannot find todo" });
    }
    res.status(200).json({ status: "Success", data: todo });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};