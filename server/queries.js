const {Pool,Client} = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});


const getEmployees = async (request, response) => {
    const client = await pool.connect();
    try{
      const results = await client.query('SELECT * FROM Employee ORDER BY id ASC');
      response.status(200).json(results.rows);
    }catch(e){
      console.log(e);
    }finally{
      client.release();
    }
  }

const getEmployeeById = async (request, response) => {
  const id = parseInt(request.params.id);
  const client = await pool.connect();
  try{
    
    const results = await client.query('SELECT * FROM Employee WHERE id = $1',[id]);
    response.status(200).json(results.rows);
  }catch(e){
    console.log(e);
  }finally{
    client.release();
  }

}



const createEmployee = async (request, response) => {
  const { first_name , last_name , is_active , date_of_birth } = request.body;
  const client = await pool.connect();
  try{
    
    const results = await client.query('INSERT INTO Employee (first_name ,last_name , is_active , date_of_birth ) VALUES ($1,$2,$3,$4)', [first_name , last_name , is_active , date_of_birth]);
    response.status(201).send(`Employee added with ID: ${results.insertId}`);
  }catch(e){
    console.log(e);
  }finally{
    client.release();
  }
}



const updateEmployee = async (request, response) => {
  const id = parseInt(request.params.id);
  const { first_name , last_name , is_active , date_of_birth } = request.body;
  const client = await pool.connect();
  try{
    
    const results = await client.query('UPDATE Employee SET first_name = $1, last_name = $2, is_active =$3, date_of_birth = $4 WHERE id = $5', [first_name , last_name , is_active , date_of_birth, id]);
    response.status(200).send(`Employee modified with ID: ${id}`);
  }catch(e){
    console.log(e);
  }finally{
    client.release();
  }
}


const deleteEmployee = async (request, response) => {
  const id = parseInt(request.params.id);
  const client = await pool.connect();
  try{
    
    const results = await client.query('DELETE FROM Employee WHERE id = $1', [id]);
    response.status(200).send(`Employee deleted with ID: ${id}`);
  }catch(e){
    console.log(e);
  }finally{
    client.release();
  }
}


const deleteAllEmployees = async (request, response) => {
  const client = await pool.connect();
  try{
    
    const results = await client.query('DELETE FROM Employee');
    response.status(200).send(`Table cleared`);
  }catch(e){
    console.log(e);
    }finally{
      client.release();
    }
}



module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployees,

}