const express = require('express');
const {uuid} = require('uuidv4');
const cors = require('cors');

const projects = [];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{//leseira :D
    return res.json("Server On!!");
});

// app.get('/projects',(req,res)=>{//listagem_Geral
//     return res.json(projects);
// });

app.get('/projects',(req,res)=>{//listagem_query
    const {title} = req.query;
    const result = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;
    return res.json(result);
});

app.post('/projects',(req,res)=>{//add
    const {title,owner} = req.body;
    const project = {id: uuid(), title,owner};

    projects.push(project);
    return res.json(project);
});

app.put('/projects/:id',(req,res)=>{//Update
    const {id} = req.params;
    const {title,owner} = req.body;

    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex < 0) {
        return res.status(400).json("Project not found");
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.json(project)
});


app.delete('/projects/:id',(req,res)=>{//delete
    const {id} = req.params;

    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex < 0) {
        return res.status(400).json("Project not found");
    }

    projects.splice(projectIndex,1);

    return res.status(204).send();
    
});


app.listen(3333, ()=>{
    console.log('Server On!!');
});