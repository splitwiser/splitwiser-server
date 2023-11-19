import Express from 'express';

const app = Express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Running at port 3000")
})
