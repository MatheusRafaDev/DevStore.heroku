import db from "./db.js";
import Express from "express";
import Cors from "cors";

const app = Express();
app.use(Cors());
app.use(Express.json());

app.get("/produto", async (req, resp) => {
    try {
        let a = await db.tb_produto.findAll({ order: [['id_produto', 'desc']] });
        resp.send(a);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.post("/produto", async (req, resp) => {
    try {
        let a = req.body
    
        let r = await db.tb_produto.findOne({where: {nm_produto: a.nm_produto}})
        if (r != null) {
            return resp.send({erro: "Esse produto ja existe"})
        }

        let produtos = await db.tb_produto.create ({
            nm_produto: a.nm_produto,
            ds_categoria: a.ds_categoria,
            vl_preco_de: a.vl_preco_de,
            vl_preco_por: a.vl_preco_por,
            vl_avaliacao: a.vl_avaliacao,
            ds_produto: a.ds_produto,
            qtd_estoque: a.qtd_estoque,
            img_produto: a.img_produto,
            bt_ativo: a.bt_ativo,
            dt_inclusao: a.dt_inclusao
        })
        resp.send(produtos);

    } catch (e) {
        resp.send(e.toString());
    }
});    

app.delete("/produto/:id", async (req,resp) => {
    try { 
        let q = await db.tb_produto.destroy({ where:{ id_produto: req.params.id}})
        resp.sendStatus(200); 
    }
    catch(e) {
        resp.send( { erro: error.toString() })
    }
});

app.put('/produto/:id', async (req,resp) => {
    try { 
        let a = req.body;
        let id = req.params.id

        let r = await db.tb_produto.findOne({where: {nm_produto: a.nm_produto}})
        if (r != null) {
            return resp.send({erro: "Esse produto ja existe"})
        }
        
        let q = await db.tb_produto.update({
            nm_produto: a.nm_produto,
            ds_categoria: a.ds_categoria,
            vl_preco_de: a.vl_preco_de,
            vl_preco_por: a.vl_preco_por,
            vl_avaliacao: a.vl_avaliacao,
            ds_produto: a.ds_produto,
            qtd_estoque: a.qtd_estoque,
            img_produto: a.img_produto,
        }, 
            {where: { id_produto: id } 
        });
        resp.sendStatus(200);
    } catch (error) {
        resp.send( { erro: "Não foi Possível Concluir essa alteração!, Verifique Se os Campos então corretos!" })
    }
});

app.listen(process.env.PORT, (x) =>
console.log(`Subiu na Porta ${process.env.PORT} Ebaaaaa`)
);