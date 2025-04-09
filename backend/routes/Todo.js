const { Router } = require("express");
const router = Router();
const Todo = require("../model/Todo");

//creation of the todo
router.post("/", async (req, res) => {
  const { content } = req.body;
  const newtodo = await Todo.create({
    content,
    createdby: req.user._id,
  });
  return res.status(201).json(newtodo);
});

//edit

//delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const newTodo = await Todo.findByIdAndDelete(id);
  return res.status(200).json(newTodo);
});

//toglecompleted
router.patch("/toggle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { content } = req.body;
    console.log("conetent ", content);
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { content: content.todo },
      { new: true }
    );
    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

//give all data according to logged in user
router.get("/", async (req, res) => {
  if (!req.user) {
    console.log("no req.user found");
    return res.status(401).json({ message: "You are not logged in" });
  }
  const alltodos = await Todo.find({ createdby: req.user._id });
  //console.log(alltodos);
  return res.status(200).json(alltodos);
});

module.exports = router;
