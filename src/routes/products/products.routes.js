import express from "express";
const { Router } = express;
const { productsDao: fileContainer } =  await import("../../daos/index.js")
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    let products = await fileContainer.getAllFile();
    res.render("main", { layouts: "index", products, session: req.session })
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let productById = await fileContainer.getById(req.params.id);
    if (!productById) {
      res.json({
        Error: "Producto no Encontrado",
      });
    } else {
      res.json({
        data: productById,
      });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await fileContainer.saveInFile(req.body);
    res.render("main", { layouts: "index" });
    res.render("layouts/index", { listProducts: false });
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let productById = await fileContainer.getById(req.params.id);
    if (!productById) {
      res.json({
        Error: "Producto no Encontrado",
      });
    } else {
      let newValues = req.body;

      for (const element in productById) {
        for (const elem in newValues) {
          if (element === elem) {
            productById[element] = newValues[elem];
          }
        }
      }
      await fileContainer.deleteById(req.params.id);
      await fileContainer.saveInFile(productById);
      res.json({
        data: productById,
      });
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await fileContainer.deleteById(req.params.id);
    res.json({
      data: "archivo eliminado con éxito",
    });
  } catch (error) {
    res.send("ERROR");
  }
});
export default router;
