
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Todocard from './component/Card/Todocard';


function App() {
  const [todoItem, settodoItem] = useState({
    task: '',
    priority: 'high'
  });
  const [todoList, setToDoList] = useState([]);
  const[selsectedTab, setSelectedTab] = useState('all');


  useEffect(() => {
    if(todoList.length == 0) return;

    localStorage.setItem('todoList', JSON.stringify(todoList));
  },[todoList]);


  useEffect(() => {
    const listFormls = JSON.parse(localStorage.getItem('todoList') || '[]');
  setToDoList(listFormls);
    }, []);

  const onDelete = (index) => {
    const listAfterDeletion = todoList.filter((_, i)=> i!== index);
    setToDoList(listAfterDeletion);
    toast.success('Task Deleted Successfully');
  };

  
  return (
    <div>

      <h1 className='text-4xl text-orange-500 text-center mt-5'>TODO APP</h1>

      <div className='bg-white flex justify-around pt-2'>
        
        {
          ['all', 'high', 'medium', 'low'].map((tab, i) => {
            return (
            <span className={`  block w-[100px] m-2  md:w-[250px] text-lg md:text-xl border-1 text-center rounded-tl-lg rounded-tr-lg py-1 text-orange-500 cursor-pointer
            ${
              tab === selsectedTab? 'bg-blue-950 text-black' : 'bg-white'}`} 
              key={i} onClick={() => setSelectedTab(tab)}>
              {tab}</span>
          
            );
          })

        }
      </div>

      <div>

        
        {todoList.map((taskItem,index)=>{
        const {task, priority} = taskItem;

        if(selsectedTab !="all" && priority != selsectedTab){
          return null;
        } 



        return (<Todocard  task={task} priority={priority} key={index} index={index}
        onDelete={onDelete}/>);
      })} </div>
      <div className='fixed bottom-0 left-0 w-full bg-blue-950 p-10 gap-y-4 flex flex-col md:flex-row justify-center items-center'>
        <input type='text'placeholder='Enter Task'
        onChange={(e)=>{
          settodoItem({
            ...todoItem,
            task: e.target.value
          })
        }} value={todoItem.task}
        
        className='bg-white text-2xl w-full md:w-[400px] px-2 p-2'/>
        <select className='text-xl bg-white ml-0  md:ml-5 rounded-md px-5 p-2 w-full md:w-[230px] h-[50px]'
        onChange={(e)=>{
          settodoItem({
            ...todoItem,
            priority: e.target.value
          })
        }
        }
        value={todoItem.priority}>
          <option value={'select priority'}>select priority</option>
          <option value={'high'} >High</option>
          <option value={'low'}>Low</option>
          <option value={'medium'}>Medium</option>
        </select>
        <button className=' text-2xl bg-orange-500 px-10  rounded-md ml-5 h-10 cursor-pointer'
        onClick={()=>{
          if(!todoItem.task ){
            toast.error('Please fill  the task');
            return;
          }
          if(!todoItem.priority){
            toast.error('Please select the priority');
            return;
          }

          setSelectedTab('all');


          setToDoList([todoItem,...todoList]);
          settodoItem({
            task: '',
            priority: ''
          })
          toast.success('Task Added Successfully');
        }}
        
        
        >Add</button>
      </div>
      <Toaster/>
    </div>
  )
}

export default App