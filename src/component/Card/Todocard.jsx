import { Trash2 as TrashIcon } from 'lucide-react';


const TASK_PRIORITY_CLASSES ={
  'high': "border-t-4 border-t-green-500",
  'low': "border-t-4 border-t-red-500",
  'medium': "border-t-4 border-t-yellow-500",
};

const BADGE_PRIORITY_CLASSES ={
  'high': "text-green-600 border-2 border-green-600",
  'low': "text-red-600 border-2 border-red-600",
  'medium': "text-yellow-600 border-2 border-yellow-600",
};

function Todocard({task,priority,index, onDelete}) {
  return (
    
        <div
         className={`bg-white p-5 m-5 shadow-lg rounded-md relative
          ${TASK_PRIORITY_CLASSES[priority]}`} 
           
        >  <span
        className={` block w-[100px] text-black border-1 text-center rounded-full  right-2 mt-3 ${BADGE_PRIORITY_CLASSES [priority]}`}>
         {priority}</span>
          <h1>{task}</h1>
          
         <TrashIcon className='absolute top-2 right-2 cursor-pointer'  onClick={()=>{
            onDelete(index);
          }}/> 
        </div>
    
  );
}

export default Todocard;