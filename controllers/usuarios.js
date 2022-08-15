import { response } from "express"; //Para que funcione res. y sea mas comodo.

export const userGet = (req, res = response) => { 

    const {} = req.query

    res.json({
        msg:'get API - controller'
    });
}

export const userPut = (req, res) => { 

    const id = req.params.id

    res.json({
        msg:'put API - controller',
        id
    });
}

export const userPost = (req, res) => { 

    const {} = req.body;

    res.json({
        msg:'post API - controller'
    });
}


export const userDelete = (req, res) => { 
    res.json({
        msg:'delete API - controller'
    });
}

export const userPatch = (req, res) => { 
    res.json({
        msg:'patch API - controller'
    });
}