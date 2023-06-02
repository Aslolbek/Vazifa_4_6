const {Router} = require("express");

const {create, update, delet, getAll} = require("../controllers/todo.controller");

const router = Router();

router.post("/todo", create);        // yangi malumot qoshish
router.post("/update/:No", update);  // tokenga tegishli malumotni id boyicha o'zgartiradi
router.put("/delete/:No", delet); // tokenga tegishli malumotni id boyicha o'chiradi
router.get("/todo", getAll);  // Tokenga tegishlik hamma yaratilgan ma'lumotni chiqaradi

module.exports = router;
