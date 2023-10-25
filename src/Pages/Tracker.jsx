import React, { useEffect, useState } from 'react';
import './tracker.css'
import EditTask from '../components/EditTask'


function Tracker() {
    const [ modalOpen, setModalOpen ] = useState( false );
  const [ tasklist, setTaskList ] = useState( [] );
  const [completedTasks, setCompletedTasks] = useState({});


  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    }
    
    let [ state, setState ] = useState( {
        user: {
            task:'',description:''
        }
    })
    let { user } = state;

    const update = ( event ) =>
    {
        setState( { user: { ...state.user, [ event.target.name ]: event.target.value } } )
    };
    let save = (objTask) => {
        let tempList = [...tasklist];  // Create a copy of the tasklist
        tempList.push( objTask );  // Add the new task
        localStorage.setItem("Task List",JSON.stringify(tempList))
        setTaskList(tempList);  // Update the state
    }
    
  let handleSave = () =>
  {
    let objTask = {
      task: user.task,
      description: user.description
    }
       save(objTask);
      
        setState({
          user: {
            task: '',   description: ''
          } ,
          index: undefined
        });
      
        setModalOpen(false);
};    
    
    useEffect(() => {
      let arr = localStorage.getItem("Task List");
      if (arr) {
        let obj = JSON.parse(arr);
        setTaskList(obj);
      }
    }, []);
    
    let deleteTask = (index) => {
      let tempList = [...tasklist]; // Create a copy of the tasklist
      tempList.splice(index, 1); // Remove the task at the specified index
      setTaskList( tempList ); // Update the state with the new list
      localStorage.setItem( "Task List", JSON.stringify( tempList ) );
  }
  const handleEdit = (index, updatedTask) => {
    let tempList = [...tasklist];
    tempList[index] = updatedTask;
    localStorage.setItem("Task List", JSON.stringify(tempList));
    setTaskList(tempList);
  };

 
  
  
  const loadCompletedTasks = () => {
    const storedCompletedTasks = localStorage.getItem("Completed Tasks");
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  };
  
  const handleCheckboxChange = (index) => {
    setCompletedTasks(prevState => {
      const updatedState = {
        ...prevState,
        [ index ]: !prevState[ index ]
      
      };
      localStorage.setItem("Completed Tasks", JSON.stringify(updatedState)); // Save to local storage
      return updatedState; // Return the updated state
    });
  };
  
  useEffect( () =>
  {
    loadCompletedTasks();
  },[])
  
  
  return (
    <div className="container">
      <div className="text-center">
        <h3>Task Tracker</h3>
        <button 
          type="button" 
          className="btn mb-2 text-white" 
          onClick={handleOpenModal}>
       Create a Task
        </button>
      </div>

      <div className={`modal fade ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
                      <div className="modal-body">
                          
            <input type="text" name='task' placeholder='Enter Task Name' className='form-control' value={user.task} onChange={update} />
         

                          <textarea name="description" id="" cols="30" rows="5"  placeholder='Add description' className='form-control mt-2' value={user.description} onChange={update}></textarea>
                      </div>
                      
            <div className="modal-footer">
              <button type="button" className="btn text-white" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn text-white" onClick={handleSave}>Add</button>
            </div>
          </div>
        </div>
      </div>
                          {/* task cards */}
          <div className="row mx-auto justify-content-center align-items-center bg-light">
              {
                  tasklist.map( (obj,index) =>
                  (
                     <div className="col-12 col-md-4 pt-4">
                      <div className="card px-4 py-2" key={index}>
                        <div className="d-flex">
                          <h4>{obj.task}</h4>
      <input  type="checkbox"  name="check" id="" className="form-check-input  px-2 ms-5 py-2"   checked={completedTasks[index] || false}   onChange={() => handleCheckboxChange(index)} /> <h8 className='ps-2 fa-italic'>Completed</h8>
                        </div>
                            
                              <p>{obj.description}</p>
                              <div className="d-flex justify-content-end align-items-end">
                         
   <img src="del.png" className='img-fluid' width={30} height={30} alt="" onClick={() => deleteTask( index )}>
                          </img>
                          
                          <EditTask  initialData={{ index, task: obj.task, description: obj.description }}
            onEdit={handleEdit} />
                         
                              </div>
                      </div>
                      </div>
                      ))
              }
      </div>
    </div>
  );
}


export default Tracker;
