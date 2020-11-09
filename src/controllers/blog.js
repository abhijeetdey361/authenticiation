const { readFile, writeFile } = require('../daos/index'); //NOTE: Importing the readFile & writeFile as separate functions

module.exports = {
    getById: async (req, res, next) => {
        try {
            const data = await readFile(dbFilePath);
            res.send(data);
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const blogs = await readFile(dbFilePath);
            const singleBlog = blogs.find(blog => blog.id === id);

            if (!singleBlog) {
                res.status(404).send(`Account with id: ${id} not found!`);
            } else {
                res.send(singleBlog);
            }
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        //NOTE: implement create operation same way as course day 7
        try{
            const newBlog = req.body;
            const blogs = await readFile(dbFilePath);
            newBlog.id = blogs.length + 1;

            blogs.push(newBlog);
            await writeFile(dbFilePath,blogs);

            res.send(blogs);
        }
        catch(error){
            res.status(500).send(error);
        }
    },
    updateById: async (req, res, next) => {
        //NOTE: implement update operation same way as course day 7
        const blogId = Number(req.params.id);
        const modifyBlog = req.body;
        const blogs = await readFile(dbFilePath);

        let flag = false;
        let resultIndex = -1;
        for(let index in blogs){
            if(blogs[index].id === blogId){
                blogs[index] = { ...blogs[index], ...modifyBlog };
                resultIndex = index;
                flag = true;
                break;
            }
        }
        if(!flag){
            res.status(404).send(`Blog with id: ${blogId} not found!`);
        }

        else{
            await writeFile(dbFilePath, blogs);
            res.send(blog[resultIndex]);
        }
    },
    deleteById: async (req, res, next) => {
        //NOTE: implement delete operation same way as course day 7
        const blogId = Number(req.params.id);
        const blogs = await readFile(dbFilePath);
        const newBlog = blogs.filter(blog => blog.id !== blogId);

        if(!newBlog){
            res.status(404).send(`Blog with id: ${blogId} not found!`);
        }
        else{
            await writeFile(dbFilePath, newBlog, "utf-8");
            res.status(200).send(newBlog);
        }
    }
}
